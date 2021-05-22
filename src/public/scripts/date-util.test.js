import { toStringWithLocaleWithWeekday, toStringWithLocale } from './date-util'

describe('date-util test', () => {
  it(`should print today's date in ch-de locale`, () => {
    expect(toStringWithLocaleWithWeekday(new Date('2021-05-22'))).toBe(
      'Samstag, 22. Mai 2021'
    )
    expect(toStringWithLocale(new Date('2021-05-22'))).toBe('22.5.2021')
  })
})
