import { convertToNearFutureString } from '../utils/date-util.mjs'
import { noteService } from '../services/note-service.mjs'

class NotesController {
  constructor() {
    // eslint-disable-next-line no-undef
    this.noteTemplateCompiled = Handlebars.compile(
      document.getElementById('notes-list-template').innerHTML
    )
    this.notesContainer = document.getElementById('notes-container')
  }

  async showNotes() {
    const notes = await noteService.getNotes()
    console.log(notes)
    const parsedNotes = notes.map((note) => {
      const {
        _id,
        title,
        description,
        importance,
        creationDate,
        dueDate,
        completionDate,
        done,
      } = note
      return {
        id: _id,
        title,
        description,
        importance: '!'.repeat(importance),
        creationDate: creationDate && convertToNearFutureString(creationDate),
        dueDate: dueDate && convertToNearFutureString(dueDate),
        completionDate:
          completionDate && convertToNearFutureString(completionDate),
        done,
      }
    })
    console.log(parsedNotes)
    this.notesContainer.innerHTML = this.noteTemplateCompiled({
      parsedNotes,
    })
  }

  initEventHandlers() {
    const createNoteButton = document.querySelector('#create-note-button')
    const createEditModal = document.querySelector('#create-edit-modal')

    createNoteButton.addEventListener('click', () => {
      createEditModal.open()
    })
    const deleteConfirmationModal = document.querySelector(
      '#delete-confirmation-modal'
    )

    deleteConfirmationModal.addEventListener('confirm', () => {
      console.log('deleting note...')
    })
    createEditModal.addEventListener('confirm', () => {
      console.log('saving note...')
    })

    this.notesContainer.addEventListener('click', (event) => {
      const editNoteId = Number(event.target.dataset.editNoteId)
      const deleteNoteId = Number(event.target.dataset.deleteNoteId)
      // editNoteId && console.log(`EDIT CLICKED with ID ${editNoteId}`)
      // deleteNoteId && console.log(`DELETE CLICKED with ID ${deleteNoteId}`)

      if (deleteNoteId) {
        deleteConfirmationModal.open()
      }
      if (editNoteId) {
        createEditModal.open()
      }
    })
  }

  initialize() {
    this.initEventHandlers()
    this.showNotes()
  }
}

new NotesController().initialize()
