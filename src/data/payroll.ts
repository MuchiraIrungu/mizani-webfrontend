export interface Staff {
  id: string
  name: string
  role: string
  branch: string
  phone: string
  bank: string
  gross: number
  paye: number
  nssf: number
  sha: number
  housing: number
  status: 'Pending' | 'Paid'
  method: 'M-Pesa' | 'Bank'
  paidOn?: string
}

export const staff: Staff[] = [
  { id: 'j-otieno', name: 'James Otieno', role: 'Branch Manager · Nairobi', branch: 'Nairobi', phone: '0722 118 340', bank: 'Equity ····4471', gross: 95_000, paye: 18_733, nssf: 2_160, sha: 2_612, housing: 1_425, status: 'Pending', method: 'Bank' },
  { id: 'a-wairimu', name: 'Anne Wairimu', role: 'Accountant', branch: 'Nairobi', phone: '0733 904 112', bank: 'KCB ····8802', gross: 78_000, paye: 13_633, nssf: 2_160, sha: 2_145, housing: 1_170, status: 'Pending', method: 'Bank' },
  { id: 'p-kimani', name: 'Peter Kimani', role: 'Store Supervisor', branch: 'Westlands', phone: '0710 552 908', bank: 'M-Pesa ····0908', gross: 52_000, paye: 6_733, nssf: 2_160, sha: 1_430, housing: 780, status: 'Pending', method: 'M-Pesa' },
  { id: 'f-akinyi', name: 'Faith Akinyi', role: 'Sales Assistant', branch: 'Nairobi', phone: '0745 220 771', bank: 'M-Pesa ····0771', gross: 34_000, paye: 3_133, nssf: 2_160, sha: 935, housing: 510, status: 'Pending', method: 'M-Pesa' },
  { id: 'd-mutiso', name: 'Daniel Mutiso', role: 'Driver', branch: 'Mombasa Road', phone: '0768 441 220', bank: 'M-Pesa ····1220', gross: 31_000, paye: 2_683, nssf: 2_160, sha: 852, housing: 465, status: 'Paid', method: 'M-Pesa', paidOn: '31 Jul 2026' },
  { id: 'r-chebet', name: 'Ruth Chebet', role: 'Stock Clerk', branch: 'Westlands', phone: '0701 883 447', bank: 'M-Pesa ····3447', gross: 28_500, paye: 2_308, nssf: 2_160, sha: 784, housing: 428, status: 'Paid', method: 'M-Pesa', paidOn: '31 Jul 2026' },
]

export const deductions = (person: Staff) => person.paye + person.nssf + person.sha + person.housing

export const netPay = (person: Staff) => person.gross - deductions(person)

export const pendingStaff = staff.filter((person) => person.status === 'Pending')

export const estimatedPayout = pendingStaff.reduce((sum, person) => sum + netPay(person), 0)

export const payrollDate = '31 Aug 2026'
export const daysToPayout = 15
