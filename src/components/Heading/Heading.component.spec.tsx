import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Heading } from './Heading.component'

describe('Heading', () => {
  it('renders the value prop inside a heading element', () => {
    render(<Heading value="Test Heading" />)
    const headingElement = document.querySelector('header')

    expect(headingElement).toBeInTheDocument()
    expect(headingElement).toHaveTextContent('Test Heading')
  })

  it('renders nothing when value is not provided', () => {
    render(<Heading />)
    const headingElement = document.querySelector('header')

    expect(headingElement).not.toBeInTheDocument()
  })
})
