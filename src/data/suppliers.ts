export interface Supplier {
  id: string
  name: string
  category: string
  owed: number
  terms: string
  lastOrder: string
}

export const suppliers: Supplier[] = [
  { id: 'unga-group', name: 'Unga Group', category: 'Dry goods · Flour milling', owed: 284_500, terms: 'Net 30', lastOrder: '14 Aug 2026' },
  { id: 'bidii', name: 'Bidii Suppliers', category: 'General wholesale', owed: 146_000, terms: 'Net 14', lastOrder: '16 Aug 2026' },
  { id: 'pwani-oil', name: 'Pwani Oil', category: 'Cooking oils', owed: 98_400, terms: 'Net 30', lastOrder: '9 Aug 2026' },
  { id: 'bamburi', name: 'Bamburi Cement', category: 'Hardware · Building materials', owed: 0, terms: 'Net 30', lastOrder: '2 Aug 2026' },
  { id: 'brookside', name: 'Brookside Dairy', category: 'Chilled · Dairy', owed: 52_180, terms: 'Net 7', lastOrder: '15 Aug 2026' },
  { id: 'devki', name: 'Devki Steel', category: 'Hardware · Steel', owed: 0, terms: 'Net 30', lastOrder: '28 Jul 2026' },
  { id: 'afya-dist', name: 'Afya Distributors', category: 'Medical supplies', owed: 36_900, terms: 'Net 14', lastOrder: '11 Aug 2026' },
  { id: 'mumias', name: 'Mumias Sugar', category: 'Dry goods · Sugar', owed: 0, terms: 'Net 30', lastOrder: '5 Aug 2026' },
]

export const totalOwed = suppliers.reduce((sum, supplier) => sum + supplier.owed, 0)
export const owingSuppliers = suppliers.filter((supplier) => supplier.owed > 0)
