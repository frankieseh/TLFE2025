import type { TaxBands, BandBreakdown, TaxBreakdown } from '../types/TaxBand'
import { NO_TAX_BANDS_ERROR } from './constants'

export const getTaxBreakdown = (income: number, taxBands: TaxBands | null) => {
  if (!taxBands || taxBands.length === 0) {
    throw new Error(NO_TAX_BANDS_ERROR)
  }

  let remainingIncome = income
  let totalTax = 0
  const breakdown: BandBreakdown = []

  for (let i = taxBands.length - 1; i >= 0; i--) {
    const { bandStart, bandEnd, taxRate } = taxBands[i]
    if (income > bandStart) {
      const taxableAmount = remainingIncome - bandStart
      const taxCollected = taxableAmount * taxRate
      breakdown.push({
        bandStart,
        bandEnd,
        taxRate,
        taxCollected,
      })
      totalTax += taxCollected
      remainingIncome -= taxableAmount
    }
  }

  return {
    totalTax: totalTax,
    breakdown: breakdown.reverse(),
  } as TaxBreakdown
}
