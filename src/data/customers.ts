export interface Purchase {
  date: string
  ref: string
  details: string
  source: 'M-Pesa' | 'Bank' | 'Cash'
  status: 'Paid' | 'Pending' | 'Overdue'
  amount: number
}

export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  pin: string
  since: string
  terms: string
  lastPurchase: string
  recent: boolean
  balance: number
  purchases: Purchase[]
}

export const customers: Customer[] = [
  {
    id: 'sokoni-retail',
    name: 'Sokoni Retail Group',
    phone: '0722 481 003',
    email: 'accounts@sokoni.co.ke',
    pin: 'P051428776K',
    since: 'Mar 2023',
    terms: 'Net 14 · Credit limit KSh 400,000',
    lastPurchase: '16 Aug 2026',
    recent: true,
    balance: 96_048,
    purchases: [
      { date: '16 Aug 2026', ref: 'INV-2043', details: 'Maize flour, cooking oil, delivery', source: 'M-Pesa', status: 'Pending', amount: 96_048 },
      { date: '2 Aug 2026', ref: 'INV-2036', details: 'Maize flour 2kg — 60 cartons', source: 'M-Pesa', status: 'Paid', amount: 100_920 },
      { date: '19 Jul 2026', ref: 'INV-2029', details: 'Assorted dry goods', source: 'Bank', status: 'Paid', amount: 64_380 },
    ],
  },
  {
    id: 'jenga-hardware',
    name: 'Jenga Hardware',
    phone: '0710 664 209',
    email: 'purchasing@jenga.co.ke',
    pin: 'P052001349B',
    since: 'Jan 2022',
    terms: 'Net 14 · Credit limit KSh 600,000',
    lastPurchase: '22 Jul 2026',
    recent: false,
    balance: 132_704,
    purchases: [
      { date: '22 Jul 2026', ref: 'INV-2038', details: 'Cement, steel bars, site delivery', source: 'Bank', status: 'Overdue', amount: 132_704 },
      { date: '30 Jun 2026', ref: 'INV-2021', details: 'Cement 50kg — 120 bags', source: 'Bank', status: 'Paid', amount: 109_968 },
    ],
  },
  {
    id: 'afya-pharma',
    name: 'Afya Pharma Chemist',
    phone: '0745 118 774',
    email: 'admin@afyapharma.co.ke',
    pin: 'P051884120C',
    since: 'Sep 2024',
    terms: 'Net 14 · Credit limit KSh 250,000',
    lastPurchase: '18 Jul 2026',
    recent: false,
    balance: 74_124,
    purchases: [
      { date: '18 Jul 2026', ref: 'INV-2035', details: 'Surgical gloves, disinfectant', source: 'M-Pesa', status: 'Overdue', amount: 74_124 },
      { date: '11 Jun 2026', ref: 'INV-2014', details: 'Disinfectant 5L — 20 units', source: 'M-Pesa', status: 'Paid', amount: 38_280 },
    ],
  },
  {
    id: 'karibu-foods',
    name: 'Karibu Foods Ltd',
    phone: '0733 902 118',
    email: 'finance@karibufoods.co.ke',
    pin: 'P051227884M',
    since: 'Jun 2023',
    terms: 'Net 14 · Credit limit KSh 500,000',
    lastPurchase: '14 Aug 2026',
    recent: true,
    balance: 152_744,
    purchases: [
      { date: '14 Aug 2026', ref: 'INV-2042', details: 'Rice 25kg, sugar 50kg', source: 'Bank', status: 'Pending', amount: 152_744 },
      { date: '28 Jul 2026', ref: 'INV-2033', details: 'Rice 25kg — 18 bags', source: 'Bank', status: 'Paid', amount: 80_388 },
    ],
  },
  {
    id: 'rift-logistics',
    name: 'Rift Logistics',
    phone: '0768 300 442',
    email: 'ap@riftlogistics.co.ke',
    pin: 'P051993002D',
    since: 'Feb 2021',
    terms: 'Net 14 · Credit limit KSh 750,000',
    lastPurchase: '10 Jul 2026',
    recent: false,
    balance: 0,
    purchases: [
      { date: '10 Jul 2026', ref: 'INV-2031', details: 'Engine oil, oil filters', source: 'Bank', status: 'Paid', amount: 179_800 },
      { date: '3 Jun 2026', ref: 'INV-2009', details: 'Engine oil 20L — 10 units', source: 'Bank', status: 'Paid', amount: 103_240 },
    ],
  },
  {
    id: 'tuskys-fresh',
    name: 'Tuskys Fresh — Ngong Road',
    phone: '0701 552 810',
    email: 'ngong@tuskysfresh.co.ke',
    pin: 'P052110877A',
    since: 'Nov 2025',
    terms: 'Cash on delivery',
    lastPurchase: '12 Aug 2026',
    recent: true,
    balance: 0,
    purchases: [
      { date: '12 Aug 2026', ref: 'INV-2040', details: 'Tomatoes, onions — weekly order', source: 'Cash', status: 'Paid', amount: 42_600 },
      { date: '4 Jul 2026', ref: 'INV-2028', details: 'Tomatoes 22 crates, onions 30 nets', source: 'M-Pesa', status: 'Paid', amount: 125_900 },
    ],
  },
  {
    id: 'mama-njeri',
    name: 'Mama Njeri Grocers',
    phone: '0726 337 981',
    email: 'njeri.grocers@gmail.com',
    pin: '—',
    since: 'Apr 2026',
    terms: 'Cash on delivery',
    lastPurchase: '15 Aug 2026',
    recent: true,
    balance: 18_560,
    purchases: [
      { date: '15 Aug 2026', ref: 'INV-2044', details: 'Sugar 50kg — 3 bags', source: 'M-Pesa', status: 'Pending', amount: 18_560 },
      { date: '1 Aug 2026', ref: 'INV-2034', details: 'Assorted dry goods', source: 'Cash', status: 'Paid', amount: 12_400 },
    ],
  },
]

export const totalReceivables = customers.reduce((sum, c) => sum + c.balance, 0)
export const withBalance = customers.filter((c) => c.balance > 0)
