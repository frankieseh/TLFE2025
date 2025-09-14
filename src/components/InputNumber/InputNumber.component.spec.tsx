import { render, fireEvent } from '@testing-library/react'
import { InputNumber } from './InputNumber.component'
import '@testing-library/jest-dom'

describe('InputNumber', () => {
  it('renders with default props', () => {
    render(<InputNumber name="amount" />)
    const input = document.querySelector('input[type="number"]')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('name', 'amount')
    expect(input).toHaveAttribute('type', 'number')
  })

  it('renders with a value', () => {
    render(<InputNumber name="amount" value={123.45} />)
    const input = document.querySelector('input[type="number"]')
    expect(input).toHaveValue(123.45)
  })

  it('calls onChange with number value', () => {
    const handleChange = jest.fn()
    const { getByRole } = render(
      <InputNumber name="amount" onChange={handleChange} />,
    )
    fireEvent.change(getByRole('spinbutton'), { target: { value: '99.99' } })
    expect(handleChange).toHaveBeenCalledWith(99.99)
  })

  it('renders as disabled', () => {
    render(<InputNumber name="amount" disabled />)
    const input = document.querySelector('input[type="number"]')
    expect(input).toBeDisabled()
  })

  it('applies custom min and step', () => {
    render(<InputNumber name="amount" min={10} step={0.5} />)
    const input = document.querySelector('input[type="number"]')
    expect(input).toHaveAttribute('min', '10')
    expect(input).toHaveAttribute('step', '0.5')
  })

  it('renders with a placeholder', () => {
    render(<InputNumber name="amount" placeholder="Enter amount" />)
    const input = document.querySelector('input[type="number"]')
    expect(input).toHaveAttribute('placeholder', 'Enter amount')
  })
})
