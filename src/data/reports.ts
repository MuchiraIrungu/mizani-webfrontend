export type RangeKey = 'W' | 'M' | 'Q' | 'Y'

export interface RangeData {
  key: RangeKey
  label: string
  caption: string
  revenue: number
  revenueTrend: number
  expenses: number
  expensesTrend: number
  trend: { label: string; value: number }[]
  breakdown: { label: string; value: number }[]
}

export const ranges: RangeData[] = [
  {
    key: 'W',
    label: 'W',
    caption: '10 – 16 Aug 2026',
    revenue: 612_400,
    revenueTrend: 6.2,
    expenses: 341_900,
    expensesTrend: -2.4,
    trend: [
      { label: 'Mon', value: 74_200 },
      { label: 'Tue', value: 88_600 },
      { label: 'Wed', value: 79_400 },
      { label: 'Thu', value: 96_100 },
      { label: 'Fri', value: 112_800 },
      { label: 'Sat', value: 108_500 },
      { label: 'Sun', value: 52_800 },
    ],
    breakdown: [
      { label: 'Stock purchases', value: 198_400 },
      { label: 'Payroll', value: 76_300 },
      { label: 'Rent & utilities', value: 32_600 },
      { label: 'Logistics', value: 21_400 },
      { label: 'Other', value: 13_200 },
    ],
  },
  {
    key: 'M',
    label: 'M',
    caption: '1 – 31 Aug 2026',
    revenue: 2_486_900,
    revenueTrend: 12.5,
    expenses: 1_394_150,
    expensesTrend: 4.1,
    trend: [
      { label: 'Wk 1', value: 548_300 },
      { label: 'Wk 2', value: 612_400 },
      { label: 'Wk 3', value: 664_800 },
      { label: 'Wk 4', value: 661_400 },
    ],
    breakdown: [
      { label: 'Stock purchases', value: 812_000 },
      { label: 'Payroll', value: 402_150 },
      { label: 'Rent & utilities', value: 96_400 },
      { label: 'Logistics', value: 54_600 },
      { label: 'Other', value: 29_000 },
    ],
  },
  {
    key: 'Q',
    label: 'Q',
    caption: 'Jun – Aug 2026',
    revenue: 7_012_800,
    revenueTrend: 9.4,
    expenses: 4_118_600,
    expensesTrend: 6.8,
    trend: [
      { label: 'Jun', value: 2_184_500 },
      { label: 'Jul', value: 2_341_400 },
      { label: 'Aug', value: 2_486_900 },
    ],
    breakdown: [
      { label: 'Stock purchases', value: 2_416_000 },
      { label: 'Payroll', value: 1_186_400 },
      { label: 'Rent & utilities', value: 289_200 },
      { label: 'Logistics', value: 148_000 },
      { label: 'Other', value: 79_000 },
    ],
  },
  {
    key: 'Y',
    label: 'Y',
    caption: 'Sep 2025 – Aug 2026',
    revenue: 26_940_300,
    revenueTrend: 18.2,
    expenses: 15_882_400,
    expensesTrend: 11.6,
    trend: [
      { label: 'Sep', value: 1_842_000 },
      { label: 'Oct', value: 1_968_400 },
      { label: 'Nov', value: 2_104_900 },
      { label: 'Dec', value: 2_640_100 },
      { label: 'Jan', value: 1_884_700 },
      { label: 'Feb', value: 1_942_300 },
      { label: 'Mar', value: 2_218_600 },
      { label: 'Apr', value: 2_106_800 },
      { label: 'May', value: 2_209_400 },
      { label: 'Jun', value: 2_184_500 },
      { label: 'Jul', value: 2_341_400 },
      { label: 'Aug', value: 2_486_900 },
    ],
    breakdown: [
      { label: 'Stock purchases', value: 9_240_000 },
      { label: 'Payroll', value: 4_486_400 },
      { label: 'Rent & utilities', value: 1_142_000 },
      { label: 'Logistics', value: 668_000 },
      { label: 'Other', value: 346_000 },
    ],
  },
]
