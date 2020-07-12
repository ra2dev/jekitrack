import * as fixtures from './fixtures'
import * as helpers from '../helpers'

describe('[Helpers]', () => {
  describe('extractTicketNumber()', () => {
    it('should work', () => {
      expect(helpers.extractTicketNumber('[GENESIS-46426] Added form library.')).toBe('GENESIS-46426')
    })
  })

  describe('groupEvents', () => {
    it('should group by dates', () => {
      expect(Object.keys(helpers.groupEvents(fixtures.demoEvents0))).toEqual([
        '2020-07-10',
        '2020-07-09',
        '2020-07-08',
        '2020-07-07',
        '2020-07-06',
      ])
    })

    it('should extract actions with messages', () => {
      expect(helpers.groupEvents(fixtures.demoEvents0)).toMatchSnapshot()
    })
  })
})
