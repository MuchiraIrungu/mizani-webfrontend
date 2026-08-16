export interface EtimsEntry {
  ref: string
  client: string
  date: string
  amount: number
  status: 'Validated' | 'Syncing'
  control?: string
}

export const filing = {
  period: 'August 2026',
  form: 'VAT-3',
  due: '20 Sep 2026',
  daysRemaining: 35,
  vat: 218_940,
  turnoverTax: 25_000,
  paye: 74_532,
}

export const totalDue = filing.vat + filing.turnoverTax

export const etims: EtimsEntry[] = [
  { ref: 'INV-2043', client: 'Sokoni Retail Group', date: '16 Aug 2026', amount: 96_048, status: 'Syncing' },
  { ref: 'INV-2044', client: 'Mama Njeri Grocers', date: '15 Aug 2026', amount: 18_560, status: 'Syncing' },
  { ref: 'INV-2042', client: 'Karibu Foods Ltd', date: '14 Aug 2026', amount: 152_744, status: 'Validated', control: '0042·1174' },
  { ref: 'INV-2040', client: 'Tuskys Fresh — Ngong Road', date: '12 Aug 2026', amount: 42_600, status: 'Validated', control: '0042·1140' },
  { ref: 'INV-2038', client: 'Jenga Hardware', date: '22 Jul 2026', amount: 132_704, status: 'Validated', control: '0041·9932' },
  { ref: 'INV-2035', client: 'Afya Pharma Chemist', date: '18 Jul 2026', amount: 74_124, status: 'Validated', control: '0041·9710' },
  { ref: 'INV-2031', client: 'Rift Logistics', date: '10 Jul 2026', amount: 179_800, status: 'Validated', control: '0041·9488' },
]
