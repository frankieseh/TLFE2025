import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TaxBands } from '../types/TaxBand'
import { DATA_TAX_BANDS_URL, TAX_BAND_STORE_NAME } from '../utils/constants'

interface TaxBandState {
  taxBands: TaxBands | null
  loading: boolean
  error: string | null
  fetchTaxBands: () => Promise<void>
}

export const useTaxBandStore = create<TaxBandState>()(
  persist(
    (set) => ({
      taxBands: null,
      loading: false,
      error: null,
      fetchTaxBands: async () => {
        set({ loading: true, error: null })
        try {
          const response = await fetch(DATA_TAX_BANDS_URL)
          if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`)
          }
          const data = (await response.json()) as TaxBands
          set({ taxBands: data, loading: false })
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : String(err),
            loading: false,
          })
        }
      },
    }),
    {
      name: TAX_BAND_STORE_NAME, // unique name for localStorage
      partialize: (state) => ({ taxBands: state.taxBands }), // only persist taxBands
    },
  ),
)
