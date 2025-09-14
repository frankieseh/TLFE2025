import { useTaxBandStore } from './TaxBand.store'
import type { TaxBands } from '../types/TaxBand'

describe('useTaxBandStore', () => {
  beforeEach(() => {
    // Reset store state before each test
    useTaxBandStore.setState({ taxBands: null, loading: false, error: null })
    jest.resetAllMocks()
  })

  it('fetches and stores tax bands', async () => {
    const mockData: TaxBands = [
      { bandStart: 0, bandEnd: 10000, taxRate: 0.1 },
      { bandStart: 10001, bandEnd: 50000, taxRate: 0.2 },
    ]
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    ) as jest.Mock

    await useTaxBandStore.getState().fetchTaxBands()

    expect(useTaxBandStore.getState().taxBands).toEqual(mockData)
    expect(useTaxBandStore.getState().loading).toBe(false)
    expect(useTaxBandStore.getState().error).toBeNull()
  })

  it('handles fetch error', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: false, status: 404 }),
    ) as jest.Mock

    await useTaxBandStore.getState().fetchTaxBands()

    expect(useTaxBandStore.getState().taxBands).toBeNull()
    expect(useTaxBandStore.getState().loading).toBe(false)
    expect(useTaxBandStore.getState().error).toContain('HTTP error status: 404')
  })
})
