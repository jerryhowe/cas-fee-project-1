import {
    findNoteById,
    sortNotesByCompletionDate,
    sortNotesByImportance,
} from './notes-service.mjs'
import {notes} from '../../public/__fixtures__/mock/mock-notes.mjs'
import {
    today, yesterday,
} from '../../public/__fixtures__/mock/mock-dates.mjs'

describe('notes-service tests', () => {
    it('should sort notes by importance (ascending order)', () => {
        expect(sortNotesByImportance(notes, 'ASC')[0].importance).toBe(2)
    })
    it('should sort notes by importance (descending order)', () => {
        const desc = sortNotesByImportance(notes, 'DESC')
        expect(desc[0].importance).toBe(5)
        // try sort with no order param to see if it will be sorted into ascending order again
        expect(sortNotesByImportance(desc)[0].importance).toBe(2)
    })
    it('should sort notes by creationDate', () => {
        expect(sortNotesByCompletionDate(notes, 'DESC')[0].creationDate).toBe(yesterday)
        expect(sortNotesByCompletionDate(notes, 'ASC')[0].creationDate).toBe(
            today
        )
    })
    it('should find note by id', () => {
        expect(findNoteById(notes, 1)).toBe(notes[0])
        expect(findNoteById(notes, 5)).toBe(notes[notes.length - 1])
    })
})
