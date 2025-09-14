import { render, screen } from '@testing-library/react'
import { TaxBreakdownTable } from './TaxBreakdownTable.component'
import '@testing-library/jest-dom'

describe('TaxBreakdownTable', () => {
  const taxBreakdown = {
    breakdown: [
      { bandStart: 0, bandEnd: 10000, taxRate: 0.1, taxCollected: 1000 },
      { bandStart: 10000, bandEnd: 50000, taxRate: 0.2, taxCollected: 7999.8 },
      { bandStart: 50000, bandEnd: null, taxRate: 0.4, taxCollected: 399.6 },
    ],
    totalTax: 9399.4,
  }

  it('renders the table headers', () => {
    render(<TaxBreakdownTable taxBreakdown={taxBreakdown} />)
    expect(screen.getByText('Band Start')).toBeInTheDocument()
    expect(screen.getByText('Band End')).toBeInTheDocument()
    expect(screen.getByText('Tax Rate')).toBeInTheDocument()
    expect(screen.getByText('Tax Collected')).toBeInTheDocument()
  })

  it('renders all tax bands', () => {
    render(<TaxBreakdownTable taxBreakdown={taxBreakdown} />)
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getAllByText('10000')).toHaveLength(2)
    expect(screen.getAllByText('50000')).toHaveLength(2)
    expect(screen.getByText('$399.60')).not.toBeNull()
  })

  it('renders the total tax', () => {
    render(<TaxBreakdownTable taxBreakdown={taxBreakdown} />)
    expect(screen.getByText(/Total/)).toBeInTheDocument()
    expect(screen.getByText('$9,399.40')).toBeInTheDocument()
  })
})
