import styles from './TaxBreakdownTable.module.css'
import type { TaxBreakdown } from '../../types/TaxBand'

interface TaxBreakdownTableProps {
  taxBreakdown: TaxBreakdown
}

export const TaxBreakdownTable = ({ taxBreakdown }: TaxBreakdownTableProps) => {
  return (
    <div className={styles.tax_breakdown_table}>
      <h2>Tax Breakdown</h2>
      <div className={styles.tax_breakdown_header}>
        <div>Band Start</div>
        <div>Band End</div>
        <div>Tax Rate</div>
        <div>Tax Collected</div>
      </div>
      {taxBreakdown.breakdown.map((band, idx) => (
        <div className={styles.tax_breakdown_row} key={idx}>
          <div>{band.bandStart}</div>
          <div>{band.bandEnd ?? '∞'}</div>
          <div>{(band.taxRate * 100).toFixed(2)}%</div>
          <div>
            {Number(band.taxCollected).toLocaleString(undefined, {
              style: 'currency',
              currency: 'NZD',
            })}
          </div>
        </div>
      ))}
      <div className={styles.tax_breakdown_total}>
        <div>Total</div>
        <div></div>
        <div></div>
        <div>
          {Number(taxBreakdown.totalTax).toLocaleString(undefined, {
            style: 'currency',
            currency: 'NZD',
          })}
        </div>
      </div>
    </div>
  )
}
