export interface MpesaDetails {
  /** How the supplier is paid on M-Pesa — drives which reference field applies. */
  kind: 'Paybill' | 'Till' | 'Send Money'
  number: string
  account?: string
  name: string
}

export interface BankDetails {
  bank: string
  account: string
  branch: string
  name: string
}

export interface Supplier {
  id: string
  name: string
  category: string
  owed: number
  terms: string
  lastOrder: string
  mpesa: MpesaDetails
  bank: BankDetails
}

export const suppliers: Supplier[] = [
  {
    id: 'unga-group',
    name: 'Unga Group',
    category: 'Dry goods · Flour milling',
    owed: 284_500,
    terms: 'Net 30',
    lastOrder: '14 Aug 2026',
    mpesa: { kind: 'Paybill', number: '888880', account: 'MZN-4471', name: 'Unga Group PLC' },
    bank: { bank: 'Stanbic Bank', account: '0100 2288 4471', branch: 'Industrial Area', name: 'Unga Group PLC' },
  },
  {
    id: 'bidii',
    name: 'Bidii Suppliers',
    category: 'General wholesale',
    owed: 146_000,
    terms: 'Net 14',
    lastOrder: '16 Aug 2026',
    mpesa: { kind: 'Till', number: '5290114', name: 'Bidii Suppliers Ltd' },
    bank: { bank: 'Equity Bank', account: '0290 1884 2210', branch: 'Westlands', name: 'Bidii Suppliers Ltd' },
  },
  {
    id: 'pwani-oil',
    name: 'Pwani Oil',
    category: 'Cooking oils',
    owed: 98_400,
    terms: 'Net 30',
    lastOrder: '9 Aug 2026',
    mpesa: { kind: 'Paybill', number: '400300', account: 'PW-88214', name: 'Pwani Oil Products' },
    bank: { bank: 'KCB', account: '1132 8890 4412', branch: 'Kilindini', name: 'Pwani Oil Products' },
  },
  {
    id: 'bamburi',
    name: 'Bamburi Cement',
    category: 'Hardware · Building materials',
    owed: 0,
    terms: 'Net 30',
    lastOrder: '2 Aug 2026',
    mpesa: { kind: 'Paybill', number: '505050', account: 'BMB-2031', name: 'Bamburi Cement PLC' },
    bank: { bank: 'Absa Bank', account: '2044 7781 0032', branch: 'Mombasa Road', name: 'Bamburi Cement PLC' },
  },
  {
    id: 'brookside',
    name: 'Brookside Dairy',
    category: 'Chilled · Dairy',
    owed: 52_180,
    terms: 'Net 7',
    lastOrder: '15 Aug 2026',
    mpesa: { kind: 'Till', number: '9902117', name: 'Brookside Dairy Ltd' },
    bank: { bank: 'Co-operative Bank', account: '0112 4471 9930', branch: 'Ruiru', name: 'Brookside Dairy Ltd' },
  },
  {
    id: 'devki',
    name: 'Devki Steel',
    category: 'Hardware · Steel',
    owed: 0,
    terms: 'Net 30',
    lastOrder: '28 Jul 2026',
    mpesa: { kind: 'Paybill', number: '733100', account: 'DVK-5512', name: 'Devki Steel Mills' },
    bank: { bank: 'NCBA', account: '6620 0091 4478', branch: 'Ruiru', name: 'Devki Steel Mills' },
  },
  {
    id: 'afya-dist',
    name: 'Afya Distributors',
    category: 'Medical supplies',
    owed: 36_900,
    terms: 'Net 14',
    lastOrder: '11 Aug 2026',
    mpesa: { kind: 'Send Money', number: '0722 884 019', name: 'Afya Distributors' },
    bank: { bank: 'Equity Bank', account: '0290 7741 2286', branch: 'Upper Hill', name: 'Afya Distributors' },
  },
  {
    id: 'mumias',
    name: 'Mumias Sugar',
    category: 'Dry goods · Sugar',
    owed: 0,
    terms: 'Net 30',
    lastOrder: '5 Aug 2026',
    mpesa: { kind: 'Paybill', number: '600200', account: 'MSC-1180', name: 'Mumias Sugar Co.' },
    bank: { bank: 'KCB', account: '1102 5567 8890', branch: 'Mumias', name: 'Mumias Sugar Co.' },
  },
]
