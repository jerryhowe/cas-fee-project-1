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
    this.showCompleted = document.querySelector(
      '#show-completed-toggle'
    ).checked
    this.notesContainer = document.querySelector('#notes-container')
    this.createEditForm = document.querySelector('#create-edit-modal')
    this.themeButton = document.querySelector('#theme-button')
  }

  async showNotes() {
    const notes = this.showCompleted
      ? await noteService.getNotes()
      : await noteService.getNotesNotCompleted()
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

    this.notesContainer.innerHTML = this.noteTemplateCompiled({
      parsedNotes,
    })
  }

  initEventHandlers() {
    const createNoteButton = document.querySelector('#create-note-button')
    const showCompletedToggle = document.querySelector('#show-completed-toggle')

    this.addFormSubmitListenerAndAction()
    createNoteButton.addEventListener('click', () => {
      this.formSubmitMode = FormMode.CREATE
      this.createEditForm.querySelector('h1').innerHTML = 'Create New Note'
      this.createEditForm.querySelector('button').innerHTML = 'Create Note'
      this.resetForm()
      this.createEditForm.open()
    })

    showCompletedToggle.addEventListener('click', (event) => {
      this.showCompleted = event.target.checked
      this.showNotes().catch(console.error)
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
        this.showNotes()
      }
      if (deleteNoteId) {
        this.deleteNoteId = deleteNoteId
        deleteConfirmationModal.open()
      }
      if (editNoteId) {
        console.log(editNoteId)
        this.editNoteId = editNoteId
        this.createEditForm.querySelector('h1').innerHTML = 'Edit Note'
        this.createEditForm.querySelector('button').innerHTML = 'Save Note'
        noteService.getNote(editNoteId).then((note) => {
          this.formSubmitMode = FormMode.EDIT
          const { title, description, importance, dueDate } = note
          // console.log(dueDate)
          // console.log(convertEpochToDateString(dueDate))
          // debugger
          console.log(description)
          console.log(dueDate)
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

    document.querySelector('#byImportance').addEventListener('click', () => {
      console.log('sorting by importance')
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
          .finally(() => {
            delete this.editNoteId
          })
      }
    })
  }

  initializeThemeButton() {
    this.themeButton.addEventListener('click', () => {
      const isLight = this.themeButton
        .querySelector('i')
        .classList.contains('fa-sun')
      document.body.classList.toggle('dark-theme')
      this.themeButton
        .querySelector('i')
        .classList.add(isLight ? 'fa-moon' : 'fa-sun')
      this.themeButton
        .querySelector('i')
        .classList.remove(isLight ? 'fa-sun' : 'fa-moon')
    })
  }

  initialize() {
    this.initEventHandlers()
    this.initializeThemeButton()
    this.showNotes().catch(console.error)
  }
}

new NotesController().initialize()
