import * as helpers from '../helpers'
import * as fixtures from './fixtures'

describe('[Helpers] Google integration', () => {
  describe('groupEvents()', () => {
    it('should work', () => {
      expect(helpers.groupEvents(fixtures.demoCalendar0)).toEqual([{}, {}])
    })
  })
})
