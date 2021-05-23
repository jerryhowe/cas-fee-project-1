import {
  findNoteById,
  sortNotesByCompletionDate,
  sortNotesByImportance,
} from './notes-service'
import { notes } from '../../__fixtures__/mock/mock-notes'
import { today, fourDaysAgo } from '../../__fixtures__/mock/mock-dates'

describe('notes-service tests', () => {
  it('should sort notes by importance (ascending order)', () => {
    expect(sortNotesByImportance(notes, 'ASC')[0].importance).toBe(1)
  })
  it('should sort notes by importance (descending order)', () => {
    const desc = sortNotesByImportance(notes, 'DESC')
    expect(desc[0].importance).toBe(5)
    // try sort with no order param to see if it will be sorted into ascending order again
    expect(sortNotesByImportance(desc)[0].importance).toBe(1)
  })
  it('should sort notes by creationDate', () => {
    expect(sortNotesByCompletionDate(notes, 'DESC')[0].creationDate).toBe(today)
    expect(sortNotesByCompletionDate(notes, 'ASC')[0].creationDate).toBe(
      fourDaysAgo
    )
  })
  it('should find note by id', () => {
    expect(findNoteById(notes, 1)).toBe(notes[0])
    expect(findNoteById(notes, 5)).toBe(notes[notes.length - 1])
  })
})
