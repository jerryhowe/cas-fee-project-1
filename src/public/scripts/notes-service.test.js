import {
  sortNotesByCompletionDate,
  sortNotesByImportance,
} from './notes-service'

const today = new Date()
const yesterday = new Date()
const dayBeforeYesterday = new Date()
const threeDaysAgo = new Date()
const fourDaysAgo = new Date()
yesterday.setDate(today.getDate() - 1)
dayBeforeYesterday.setDate(yesterday.getDate() - 1)
threeDaysAgo.setDate(dayBeforeYesterday.getDate() - 1)
fourDaysAgo.setDate(threeDaysAgo.getDate() - 1)

const notes = [
  {
    title: 'title 1',
    description: 'description 1',
    importance: 1,
    dueDate: today,
    completionDate: today,
    creationDate: today,
    done: false,
  },
  {
    title: 'title 2',
    description: 'description 2',
    importance: 2,
    dueDate: yesterday,
    completionDate: yesterday,
    creationDate: yesterday,
    done: false,
  },
  {
    title: 'title 3',
    description: 'description 3',
    importance: 3,
    dueDate: dayBeforeYesterday,
    completionDate: dayBeforeYesterday,
    creationDate: dayBeforeYesterday,
    done: false,
  },
  {
    title: 'title 4',
    description: 'description 4',
    importance: 4,
    dueDate: threeDaysAgo,
    completionDate: threeDaysAgo,
    creationDate: threeDaysAgo,
    done: false,
  },
  {
    title: 'title 5',
    description: 'description 5',
    importance: 5,
    dueDate: fourDaysAgo,
    completionDate: fourDaysAgo,
    creationDate: fourDaysAgo,
    done: false,
  },
]

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
})
