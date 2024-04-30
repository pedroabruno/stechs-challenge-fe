import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../../src/app/page'
 
describe('Main page', () => {
  it('renders a heading', () => {
    render(<Home />)
    const heading = screen.getByText('HOME')
    expect(heading).toBeInTheDocument()
  })
})