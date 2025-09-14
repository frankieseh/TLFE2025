import { getTaxBreakdown } from './getTaxBreakdown'
import type { TaxBands } from '../types/TaxBand'
import { NO_TAX_BANDS_ERROR } from './constants'

describe('getTaxBreakdown', () => {
  it('calculates tax breakdown for valid bands', () => {
    const taxBands: TaxBands = [
      { bandStart: 0, bandEnd: 10000, taxRate: 0.1 },
      { bandStart: 10001, bandEnd: 50000, taxRate: 0.2 },
      { bandStart: 50001, bandEnd: null, taxRate: 0.4 },
    ]
    const income = 60000
    const result = getTaxBreakdown(income, taxBands)
    expect(result.totalTax).toBeGreaterThan(0)
    expect(result.breakdown.length).toBeGreaterThan(0)
    expect(result.breakdown[0]).toHaveProperty('taxCollected')
  })

  it('returns zero tax for zero income', () => {
    const taxBands: TaxBands = [{ bandStart: 0, bandEnd: 10000, taxRate: 0.1 }]
    const result = getTaxBreakdown(0, taxBands)
    expect(result.totalTax).toBe(0)
  })

  it('throws error if taxBands is null', () => {
    expect(() => getTaxBreakdown(50000, null)).toThrow(NO_TAX_BANDS_ERROR)
  })

  it('throws error if taxBands is empty', () => {
    expect(() => getTaxBreakdown(50000, [])).toThrow(NO_TAX_BANDS_ERROR)
  })
})
