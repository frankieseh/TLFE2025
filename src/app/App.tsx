import './App.css'
import { useCallback, useEffect, useState } from 'react'
import { Heading } from '../components/Heading/Heading.component'
import { Button } from '../components/Button/Button.component'
import { getTaxBreakdown } from '../utils/getTaxBreakdown'
import { InputNumber } from '../components/InputNumber/InputNumber.component'
import {
  APP_TITLE,
  CALCULATE_TAX_TEXT,
  ENTER_INCOME_MESSAGE,
  FETCH_ERROR_MESSAGE,
  INCOME_STEP,
  INPUT_PLACEHOLDER,
  LOADING_MESSAGE,
  MIN_INCOME,
} from '../utils/constants'
import { useTaxBandStore } from '../store/TaxBand.store'
import type { TaxBreakdown } from '../types/TaxBand'
import { TaxBreakdownTable } from '../components/TaxBreakdownTable/TaxBreakdownTable.component'

function App() {
  // uri hardcoded for demo purposes - ideally would be configurable
  const {
    taxBands,
    loading,
    error: fetchError,
    fetchTaxBands,
  } = useTaxBandStore()
  const [taxBreakdown, setTaxBreakdown] = useState<TaxBreakdown | null>(null)

  useEffect(() => {
    void fetchTaxBands()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClick = useCallback(() => {
    const input = document.querySelector<HTMLInputElement>('input')
    if (input) {
      const income = parseFloat(input.value)

      const breakdownResult: TaxBreakdown = getTaxBreakdown(income, taxBands)
      setTaxBreakdown(breakdownResult)
    }
  }, [taxBands])

  return (
    <>
      <Heading value={APP_TITLE} />
      <main>
        {loading && LOADING_MESSAGE}
        {fetchError && FETCH_ERROR_MESSAGE}
        {!loading && !fetchError && (
          <>
            <div>{ENTER_INCOME_MESSAGE}</div>
            <div className="calculatorInput">
              <InputNumber
                name="income"
                min={MIN_INCOME}
                step={INCOME_STEP}
                placeholder={INPUT_PLACEHOLDER}
              />
              <Button onClick={handleClick}>{CALCULATE_TAX_TEXT}</Button>
            </div>
            <div>
              {taxBreakdown && (
                <TaxBreakdownTable taxBreakdown={taxBreakdown} />
              )}
            </div>
          </>
        )}
      </main>
    </>
  )
}

export default App
