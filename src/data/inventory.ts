export interface Item {
  name: string
  sku: string
  supplier: string
  category: string
  units: number
  unitLabel: string
  reorderAt: number
}

export const items: Item[] = [
  { name: 'Maize flour 2kg — Jogoo', sku: 'DRY-MZ-2000', supplier: 'Unga Group', category: 'Dry goods', units: 184, unitLabel: 'packets', reorderAt: 60 },
  { name: 'Rice 25kg — Pishori', sku: 'DRY-RC-2500', supplier: 'Mwea Millers', category: 'Dry goods', units: 22, unitLabel: 'bags', reorderAt: 25 },
  { name: 'Sugar 50kg — Mumias', sku: 'DRY-SG-5000', supplier: 'Mumias Sugar', category: 'Dry goods', units: 41, unitLabel: 'bags', reorderAt: 15 },
  { name: 'Wheat flour 2kg — Exe', sku: 'DRY-WF-2000', supplier: 'Unga Group', category: 'Dry goods', units: 9, unitLabel: 'packets', reorderAt: 40 },

  { name: 'Cooking oil 5L — Rina', sku: 'LIQ-CO-5000', supplier: 'Pwani Oil', category: 'Cooking oils', units: 76, unitLabel: 'jerricans', reorderAt: 30 },
  { name: 'Cooking oil 20L — Elianto', sku: 'LIQ-CO-2000L', supplier: 'Bidco Africa', category: 'Cooking oils', units: 12, unitLabel: 'drums', reorderAt: 14 },

  { name: 'Milk 500ml — Brookside', sku: 'CHL-MK-0500', supplier: 'Brookside Dairy', category: 'Chilled', units: 240, unitLabel: 'packets', reorderAt: 120 },
  { name: 'Yoghurt 1L — Daima', sku: 'CHL-YG-1000', supplier: 'Brookside Dairy', category: 'Chilled', units: 34, unitLabel: 'bottles', reorderAt: 40 },

  { name: 'Cement 50kg — Bamburi', sku: 'HRD-CM-5000', supplier: 'Bamburi Cement', category: 'Hardware', units: 320, unitLabel: 'bags', reorderAt: 100 },
  { name: 'Steel bars 12mm', sku: 'HRD-SB-0012', supplier: 'Devki Steel', category: 'Hardware', units: 58, unitLabel: 'lengths', reorderAt: 40 },
  { name: 'Roofing nails 5kg', sku: 'HRD-RN-5000', supplier: 'Tononoka Steel', category: 'Hardware', units: 6, unitLabel: 'boxes', reorderAt: 20 },

  { name: 'Surgical gloves — box of 100', sku: 'MED-GL-0100', supplier: 'Afya Distributors', category: 'Medical supplies', units: 88, unitLabel: 'boxes', reorderAt: 30 },
  { name: 'Disinfectant 5L', sku: 'MED-DS-5000', supplier: 'Afya Distributors', category: 'Medical supplies', units: 11, unitLabel: 'jerricans', reorderAt: 15 },
]

export const isLow = (item: Item) => item.units <= item.reorderAt

export const categories = [...new Set(items.map((item) => item.category))]

export const lowStockCount = items.filter(isLow).length
