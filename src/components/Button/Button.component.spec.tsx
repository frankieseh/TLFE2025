import { render, fireEvent } from '@testing-library/react'
import { Button } from './Button.component'
import '@testing-library/jest-dom'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = document.querySelector('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders as disabled', () => {
    render(<Button disabled>Disabled</Button>)
    const button = document.querySelector('button')
    expect(button).toBeDisabled()
  })

  it('applies custom className', () => {
    const { getByRole } = render(
      <Button className="custom-class">Classy</Button>,
    )
    expect(getByRole('button')).toHaveClass('custom-class')
  })

  it('renders with submit type', () => {
    const { getByRole } = render(<Button type="submit">Submit</Button>)
    expect(getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('renders with reset type', () => {
    const { getByRole } = render(<Button type="reset">Reset</Button>)
    expect(getByRole('button')).toHaveAttribute('type', 'reset')
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()
    const { getByRole } = render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    )
    fireEvent.click(getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
