import { sortNotesByImportance } from './notes-service'
const notes = [
  {
    title: 'title 1',
    description: 'description 1',
    importance: 1,
    dueDate: new Date(),
    completionDate: new Date(),
    creationDate: new Date(),
    done: false,
  },
  {
    title: 'title 2',
    description: 'description 2',
    importance: 2,
    dueDate: new Date(),
    completionDate: new Date(),
    creationDate: new Date(),
    done: false,
  },
  {
    title: 'title 3',
    description: 'description 3',
    importance: 3,
    dueDate: new Date(),
    completionDate: new Date(),
    creationDate: new Date(),
    done: false,
  },
  {
    title: 'title 4',
    description: 'description 4',
    importance: 4,
    dueDate: new Date(),
    completionDate: new Date(),
    creationDate: new Date(),
    done: false,
  },
  {
    title: 'title 5',
    description: 'description 5',
    importance: 5,
    dueDate: new Date(),
    completionDate: new Date(),
    creationDate: new Date(),
    done: false,
  },
]

describe('notes-service tests', () => {
  it('should sort notes by importance (ascending order)', () => {
    sortNotesByImportance(notes, 'ASC')
    expect(notes[0].importance).toBe(1)
  })
  it('should sort notes by importance (descending order)', () => {
    sortNotesByImportance(notes, 'DESC')
    expect(notes[0].importance).toBe(5)
  })
})
