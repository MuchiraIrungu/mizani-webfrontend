export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue'

export interface LineItem {
  description: string
  detail: string
  qty: number
  unit: number
  vat: number
}

export interface Invoice {
  ref: string
  client: string
  contact: string
  pin: string
  issued: string
  due: string
  dueNote: string
  status: InvoiceStatus
  source: 'M-Pesa' | 'Bank' | 'Cash'
  branch: string
  etims: string
  items: LineItem[]
  payments: { date: string; method: string; reference: string; amount: number }[]
}

export const invoices: Invoice[] = [
  {
    ref: 'INV-2043',
    client: 'Sokoni Retail Group',
    contact: 'accounts@sokoni.co.ke · 0722 481 003',
    pin: 'P051428776K',
    issued: '16 Aug 2026',
    due: '30 Aug 2026',
    dueNote: 'Due in 14 days',
    status: 'Pending',
    source: 'M-Pesa',
    branch: 'Nairobi Branch',
    etims: '0042·1187',
    items: [
      { description: 'Maize flour 2kg — Jogoo', detail: 'Wholesale carton of 12', qty: 40, unit: 1450, vat: 16 },
      { description: 'Cooking oil 5L — Rina', detail: 'Wholesale carton of 4', qty: 18, unit: 2380, vat: 16 },
      { description: 'Delivery — Westlands route', detail: 'Same-day, two drops', qty: 1, unit: 3500, vat: 16 },
    ],
    payments: [],
  },
  {
    ref: 'INV-2042',
    client: 'Karibu Foods Ltd',
    contact: 'finance@karibufoods.co.ke · 0733 902 118',
    pin: 'P051227884M',
    issued: '14 Aug 2026',
    due: '28 Aug 2026',
    dueNote: 'Due in 12 days',
    status: 'Pending',
    source: 'Bank',
    branch: 'Nairobi Branch',
    etims: '0042·1174',
    items: [
      { description: 'Rice 25kg — Pishori', detail: 'Bagged, grade A', qty: 24, unit: 3850, vat: 16 },
      { description: 'Sugar 50kg', detail: 'Mumias, bulk', qty: 6, unit: 6400, vat: 16 },
    ],
    payments: [],
  },
  {
    ref: 'INV-2038',
    client: 'Jenga Hardware',
    contact: 'purchasing@jenga.co.ke · 0710 664 209',
    pin: 'P052001349B',
    issued: '22 Jul 2026',
    due: '5 Aug 2026',
    dueNote: '11 days overdue',
    status: 'Overdue',
    source: 'Bank',
    branch: 'Westlands Branch',
    etims: '0041·9932',
    items: [
      { description: 'Cement 50kg — Bamburi', detail: 'Pallet of 40 bags', qty: 80, unit: 790, vat: 16 },
      { description: 'Steel bars 12mm', detail: 'Length 12m', qty: 30, unit: 1180, vat: 16 },
      { description: 'Site delivery — Kikuyu', detail: 'Tipper hire', qty: 2, unit: 7500, vat: 16 },
    ],
    payments: [],
  },
  {
    ref: 'INV-2035',
    client: 'Afya Pharma Chemist',
    contact: 'admin@afyapharma.co.ke · 0745 118 774',
    pin: 'P051884120C',
    issued: '18 Jul 2026',
    due: '1 Aug 2026',
    dueNote: '15 days overdue',
    status: 'Overdue',
    source: 'M-Pesa',
    branch: 'Nairobi Branch',
    etims: '0041·9710',
    items: [
      { description: 'Surgical gloves — box of 100', detail: 'Latex, medium', qty: 45, unit: 980, vat: 16 },
      { description: 'Disinfectant 5L', detail: 'Hospital grade', qty: 12, unit: 1650, vat: 16 },
    ],
    payments: [],
  },
  {
    ref: 'INV-2031',
    client: 'Rift Logistics',
    contact: 'ap@riftlogistics.co.ke · 0768 300 442',
    pin: 'P051993002D',
    issued: '10 Jul 2026',
    due: '24 Jul 2026',
    dueNote: 'Settled 21 Jul 2026',
    status: 'Paid',
    source: 'Bank',
    branch: 'Mombasa Road Branch',
    etims: '0041·9488',
    items: [
      { description: 'Engine oil 20L — Shell Rimula', detail: 'Fleet servicing', qty: 15, unit: 8900, vat: 16 },
      { description: 'Oil filters', detail: 'Assorted, Isuzu FRR', qty: 15, unit: 1450, vat: 16 },
    ],
    payments: [{ date: '21 Jul 2026', method: 'Bank transfer', reference: 'FT26202XK41Q', amount: 179800 }],
  },
  {
    ref: 'INV-2028',
    client: 'Tuskys Fresh — Ngong Road',
    contact: 'ngong@tuskysfresh.co.ke · 0701 552 810',
    pin: 'P052110877A',
    issued: '4 Jul 2026',
    due: '18 Jul 2026',
    dueNote: 'Settled 17 Jul 2026',
    status: 'Paid',
    source: 'M-Pesa',
    branch: 'Nairobi Branch',
    etims: '0041·9203',
    items: [
      { description: 'Tomatoes — crate', detail: 'Grade 1, 64kg crate', qty: 22, unit: 3200, vat: 0 },
      { description: 'Onions — net bag', detail: '13kg net', qty: 30, unit: 1850, vat: 0 },
    ],
    payments: [{ date: '17 Jul 2026', method: 'M-Pesa paybill 400200', reference: 'SGH4K21LMQ', amount: 125900 }],
  },
]

export const lineTotal = (item: LineItem) => item.qty * item.unit

export const invoiceSubtotal = (invoice: Invoice) =>
  invoice.items.reduce((sum, item) => sum + lineTotal(item), 0)

export const invoiceVat = (invoice: Invoice) =>
  invoice.items.reduce((sum, item) => sum + (lineTotal(item) * item.vat) / 100, 0)

export const invoiceTotal = (invoice: Invoice) => invoiceSubtotal(invoice) + invoiceVat(invoice)

export const money = (value: number) =>
  `KSh ${Math.round(value).toLocaleString('en-KE')}`

export const statusTone: Record<InvoiceStatus, string> = {
  Paid: 'pill--success',
  Pending: 'pill--warning',
  Overdue: 'pill--danger',
}
