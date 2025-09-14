export type TaxBand = {
  bandStart: number
  bandEnd: number | null
  taxRate: number
}

export type TaxBands = Array<TaxBand>

export type BandBreakdown = Array<TaxBand & { taxCollected: number }>

export type TaxBreakdown = {
  totalTax: number
  breakdown: BandBreakdown
}
