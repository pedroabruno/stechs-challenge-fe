import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import {CableModemSkeletonTable, AddCableModemSection} from '../../src/components/table/table'

describe('CableModemSkeletonTable component', () => {
    it('should render properly', () => {
      render(<CableModemSkeletonTable />)
      const nameHeader = screen.getByText('NAME')
      const descriptionHeader = screen.getByText('DESCRIPTION')
      const statusHeader = screen.getByText('STATUS')
      const dateHeader = screen.getByText('Valid Since')
      const actionsHeader = screen.getByText('Actions')
      expect(nameHeader).toBeInTheDocument()
      expect(descriptionHeader).toBeInTheDocument()
      expect(statusHeader).toBeInTheDocument()
      expect(dateHeader).toBeInTheDocument()
      expect(actionsHeader).toBeInTheDocument()
    })
})