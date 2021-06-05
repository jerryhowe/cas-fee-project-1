import { toStringWithLocaleWithWeekday, toStringWithLocale } from './date-util.mjs'

describe('date-util test', () => {
  it(`should print today's date in en-us locale`, () => {
    expect(toStringWithLocaleWithWeekday(new Date('2021-05-22'))).toBe(
      'Saturday, May 22, 2021'
    )
    expect(toStringWithLocale(new Date('2021-05-22'))).toBe('5/22/2021')
  })
})
