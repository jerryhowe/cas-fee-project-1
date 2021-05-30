const today = new Date()
const yesterday = new Date()
const dayBeforeYesterday = new Date()
const threeDaysAgo = new Date()
const fourDaysAgo = new Date()
yesterday.setDate(today.getDate() - 1)
dayBeforeYesterday.setDate(yesterday.getDate() - 1)
threeDaysAgo.setDate(dayBeforeYesterday.getDate() - 1)
fourDaysAgo.setDate(threeDaysAgo.getDate() - 1)

export const notes = [
  {
    id: 1,
    title: 'title 1',
    description: 'description 1',
    importance: 1,
    dueDate: today,
    completionDate: today,
    creationDate: today,
    done: false,
  },
  {
    id: 2,
    title: 'title 2',
    description: 'description 2',
    importance: 2,
    dueDate: yesterday,
    completionDate: yesterday,
    creationDate: yesterday,
    done: false,
  },
  {
    id: 3,
    title: 'title 3',
    description: 'description 3',
    importance: 3,
    dueDate: dayBeforeYesterday,
    completionDate: dayBeforeYesterday,
    creationDate: dayBeforeYesterday,
    done: false,
  },
  {
    id: 4,
    title: 'title 4',
    description: 'description 4',
    importance: 4,
    dueDate: threeDaysAgo,
    completionDate: threeDaysAgo,
    creationDate: threeDaysAgo,
    done: false,
  },
  {
    id: 5,
    title: 'title 5',
    description: 'description 5',
    importance: 5,
    dueDate: fourDaysAgo,
    completionDate: fourDaysAgo,
    creationDate: fourDaysAgo,
    done: false,
  },
]

class NotesController {
  constructor() {
    this.noteTemplateCompiled = Handlebars.compile(
      document.getElementById('notes-list-template').innerHTML
    )
    this.notesContainer = document.getElementById('notes-container')
  }

  showNotes() {
    this.notesContainer.innerHTML = this.noteTemplateCompiled({
      notes,
    })
  }

  initialize() {
    this.showNotes()
  }
}

new NotesController().initialize()
