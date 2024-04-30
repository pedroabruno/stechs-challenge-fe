import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { formatDate, getStatusColor } from '../../src/scripts/utils'
import { CABLE_MODEM_STATUS } from '../../src/constants/constants'
import { ZonedDateTime, ZoneId } from '@internationalized/date'
 
describe('formatDate function', () => {
  it('it changes the format to dd-mm-yyyy', () => {
    const date = new ZonedDateTime(2022, 2, 3,'America/Los_Angeles', -28800000,9, 15, 0);
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('3-2-2022')
  })
})

describe('getStatusColor function', () => {

    it("returns 'success' when statusId is Active", () => {
      const statusId = CABLE_MODEM_STATUS.ACTIVE.value
      const result = getStatusColor(statusId)
      expect(result).toBe('success')
    })

    it("returns 'warning' when statusId is Provision", () => {
        const statusId = CABLE_MODEM_STATUS.PROVISION.value
        const result = getStatusColor(statusId)
        expect(result).toBe('warning')
      })

    it("returns 'danger' when statusId is Suspended", () => {
        const statusId = CABLE_MODEM_STATUS.SUSPENDED.value
        const result = getStatusColor(statusId)
        expect(result).toBe('danger')
    })

      it("returns 'default' when statusId is not Active, Provision or Suspended ", () => {
        const statusId = 'random text'
        const result = getStatusColor(statusId)
        expect(result).toBe('default')
      })
})