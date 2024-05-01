import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import {ActionButton, CreateItemButton} from '../../src/components/table/buttons'
 
describe('ActionButton component', () => {
  it('should render properly', () => {
    render(<ActionButton />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('should run the correct function', () => {
    const onClickFunc = jest.fn()
    const testProps = {
        onClick : onClickFunc,
        displayName: 'action',
        color: 'primary',
    } 
    render(<ActionButton  {...testProps} />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(onClickFunc).toHaveBeenCalledTimes(1);
  })
})

describe('CreateItemButton component', () => {
    it('should render properly', () => {
      render(<CreateItemButton />)
      const button = screen.getByRole('button')
      expect(button).toBeInTheDocument()
    })

    it('should run the correct function', () => {
        const onClickFunc = jest.fn()
        const testProps = {
            onClick : onClickFunc,
        } 
        render(<ActionButton  {...testProps} />)
        const button = screen.getByRole('button')
        fireEvent.click(button)
        expect(onClickFunc).toHaveBeenCalledTimes(1);
      })
  })