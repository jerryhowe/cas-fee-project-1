import {
  convertEpochToDateString,
  convertToNearFutureString,
} from '../utils/date-util.mjs'
import { noteService } from '../services/note-service.mjs'

const FormMode = Object.freeze({ CREATE: 1, EDIT: 2 })

class NotesController {
  constructor() {
    this.formSubmitMode = FormMode.CREATE
    // eslint-disable-next-line no-undef
    this.noteTemplateCompiled = Handlebars.compile(
      document.getElementById('notes-list-template').innerHTML
    )
    this.notesContainer = document.getElementById('notes-container')
    this.createEditForm = document.querySelector('#create-edit-modal')
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
        dateCreated,
        dateDeleted,
        dueDate,
        dateCompleted,
        done,
      } = note
      return {
        id: _id,
        title,
        description,
        importance: '!'.repeat(importance),
        dateCreated: dateCreated && convertToNearFutureString(dateCreated),
        dateDeleted,
        dueDate: dueDate && convertToNearFutureString(dueDate),
        dateCompleted:
          dateCompleted && convertToNearFutureString(dateCompleted),
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
    this.addFormSubmitListenerAndAction()
    createNoteButton.addEventListener('click', () => {
      this.formSubmitMode = FormMode.CREATE
      this.createEditForm.querySelector('h1').innerHTML = 'Create New Note'
      this.createEditForm.querySelector('button').innerHTML = 'Create Note'
      this.resetForm()
      this.createEditForm.open()
    })
    const deleteConfirmationModal = document.querySelector(
      '#delete-confirmation-modal'
    )
    deleteConfirmationModal.addEventListener('cancel', () => {
      delete this.deleteNoteId
    })
    deleteConfirmationModal.addEventListener('confirm', () => {
      noteService
        .deleteNote(this.deleteNoteId)
        .catch(console.error)
        .finally(() => delete this.deleteNoteId)
      this.showNotes().catch(console.error)
    })

    this.notesContainer.addEventListener('click', (event) => {
      const { deleteNoteId, editNoteId, doneNoteId } = event.target.dataset
      if (doneNoteId) {
        noteService
          .markCompleted(doneNoteId, event.target.checked)
          .catch(console.error)
      }
      if (deleteNoteId) {
        this.deleteNoteId = deleteNoteId
        deleteConfirmationModal.open()
      }
      if (editNoteId) {
        this.editNoteId = editNoteId
        this.createEditForm.querySelector('h1').innerHTML = 'Edit Note'
        this.createEditForm.querySelector('button').innerHTML = 'Save Note'
        noteService.getNote(editNoteId).then((note) => {
          this.formSubmitMode = FormMode.EDIT
          const { title, description, importance, dueDate } = note
          // console.log(dueDate)
          // console.log(convertEpochToDateString(dueDate))
          this.createEditForm
            .querySelector('#title')
            .setAttribute('value', title)
          this.createEditForm.querySelector('#description').innerHTML =
            description
          this.createEditForm.querySelector('#importance').value = importance
          this.createEditForm
            .querySelector('#due-date')
            .setAttribute(
              'value',
              dueDate ? convertEpochToDateString(dueDate) : null
            )
          this.createEditForm.open()
        })
      }
    })
  }

  resetForm() {
    this.createEditForm.querySelector('#title').setAttribute('value', '')
    this.createEditForm.querySelector('#description').innerHTML = null
    this.createEditForm.querySelector('#importance').value = ''
    this.createEditForm.querySelector('#due-date').setAttribute('value', '')
  }

  addFormSubmitListenerAndAction() {
    const title = document.getElementById('title')
    const description = document.getElementById('description')
    const importance = document.getElementById('importance')
    const dueDate = document.getElementById('due-date')

    const form = document.getElementById('form')
    form.addEventListener('submit', (event) => {
      event.preventDefault()

      const message = `
    Title: ${title.value}
    Description: ${description.value}
    Importance: ${importance.value}
    Duedate: ${dueDate.value}
  `
      if (this.formSubmitMode === FormMode.CREATE) {
        noteService
          .addNote(
            title.value,
            description.value,
            importance.value,
            new Date(dueDate.value).getTime()
          )
          .then(() => {
            this.createEditForm.hide()
            this.showNotes().catch(console.error)
          })
          .catch((err) => console.log(err))
      } else {
        noteService
          .updateNote(
            this.editNoteId,
            title.value,
            description.value,
            importance.value,
            new Date(dueDate.value).getTime()
          )
          .then(() => {
            this.createEditForm.hide()
            this.showNotes().catch(console.error)
          })
          .catch((err) => console.log(err))
      }
      console.log(message)
    })
  }

  initialize() {
    this.initEventHandlers()
    this.showNotes().catch(console.error)
  }
}

new NotesController().initialize()
