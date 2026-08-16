import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { suppliers as seed, type Supplier } from '../data/suppliers'

export type PayMethod = 'M-Pesa' | 'Bank'

export interface Payment {
  id: string
  supplierId: string
  supplierName: string
  method: PayMethod
  destination: string
  amount: number
  reference: string
  note: string
  paidAt: string
}

export interface PayRequest {
  supplierId: string
  method: PayMethod
  amount: number
  note: string
}

export type PayStatus = 'idle' | 'processing' | 'succeeded' | 'failed'

/**
 * Supplier balances and the payments log. Payments are written from the
 * suppliers list and read back by the summary cards, so this state has to
 * outlive any single component.
 */
export const useSuppliersStore = defineStore('suppliers', () => {
  /* Copy the fixtures so the seed module is never mutated. */
  const items = ref<Supplier[]>(seed.map((supplier) => ({ ...supplier })))
  const payments = ref<Payment[]>([])

  const payingId = ref<string | null>(null)
  const status = ref<PayStatus>('idle')
  const error = ref<string | null>(null)
  const lastPayment = ref<Payment | null>(null)

  const payingSupplier = computed(() => items.value.find((item) => item.id === payingId.value) ?? null)
  const totalOwed = computed(() => items.value.reduce((sum, item) => sum + item.owed, 0))
  const owingCount = computed(() => items.value.filter((item) => item.owed > 0).length)
  const settledCount = computed(() => items.value.length - owingCount.value)

  function openPayCard(supplierId: string) {
    payingId.value = supplierId
    status.value = 'idle'
    error.value = null
    lastPayment.value = null
  }

  function closePayCard() {
    payingId.value = null
    status.value = 'idle'
    error.value = null
  }

  function destinationFor(supplier: Supplier, method: PayMethod) {
    if (method === 'M-Pesa') {
      const account = supplier.mpesa.account ? ` · Acc ${supplier.mpesa.account}` : ''
      return `${supplier.mpesa.kind} ${supplier.mpesa.number}${account}`
    }
    return `${supplier.bank.bank} ${supplier.bank.account}`
  }

  /**
   * Sends a supplier payment. The real call goes to the payments service
   * (M-Pesa B2B, or a bank transfer instruction); until that exists this
   * resolves locally with a mock confirmation code so the flow runs end to end.
   */
  async function paySupplier(request: PayRequest) {
    const supplier = items.value.find((item) => item.id === request.supplierId)

    if (!supplier) {
      status.value = 'failed'
      error.value = 'That supplier no longer exists.'
      return null
    }
    if (!Number.isFinite(request.amount) || request.amount <= 0) {
      status.value = 'failed'
      error.value = 'Enter an amount greater than zero.'
      return null
    }
    if (request.amount > supplier.owed) {
      status.value = 'failed'
      error.value = 'Amount is more than the outstanding balance.'
      return null
    }

    status.value = 'processing'
    error.value = null

    try {
      // TODO: POST /api/payments/suppliers { supplierId, method, amount, note }
      await new Promise((resolve) => setTimeout(resolve, 900))

      const stamp = new Date()
      const payment: Payment = {
        id: `${supplier.id}-${stamp.getTime()}`,
        supplierId: supplier.id,
        supplierName: supplier.name,
        method: request.method,
        destination: destinationFor(supplier, request.method),
        amount: request.amount,
        reference:
          request.method === 'M-Pesa'
            ? `S${stamp.getTime().toString(36).toUpperCase().slice(-8)}`
            : `FT${stamp.getTime().toString().slice(-10)}`,
        note: request.note,
        paidAt: stamp.toLocaleString('en-KE', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      }

      supplier.owed = Math.max(supplier.owed - payment.amount, 0)
      payments.value.unshift(payment)
      lastPayment.value = payment
      status.value = 'succeeded'
      return payment
    } catch {
      status.value = 'failed'
      error.value = 'The payment could not be sent. Try again.'
      return null
    }
  }

  return {
    items,
    payments,
    payingId,
    status,
    error,
    lastPayment,
    payingSupplier,
    totalOwed,
    owingCount,
    settledCount,
    openPayCard,
    closePayCard,
    destinationFor,
    paySupplier,
  }
})
