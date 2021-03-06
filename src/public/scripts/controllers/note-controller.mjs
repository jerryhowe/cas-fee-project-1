import {
  convertEpochToDateString,
  convertToNearFutureString,
} from '../utils/date-util.mjs'
import { noteService } from '../services/note-service.mjs'
import { valueStorage } from '../services/value-storage.js'

const FormMode = Object.freeze({ CREATE: 1, EDIT: 2 })
const DEFAULT_IMPORTANCE = 3

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
    this.showDueDate = document.querySelector('#show-completed-toggle').checked
    this.notesContainer = document.querySelector('#notes-container')
    this.createEditForm = document.querySelector('#create-edit-modal')
    if (valueStorage.getItem('showCompleted')) {
      document
        .querySelector('#show-completed-toggle')
        .setAttribute('checked', '')
    }
    if (valueStorage.getItem('showDueDate')) {
      document
        .querySelector('#show-due-date-toggle')
        .setAttribute('checked', '')
    }
  }

  async sortNotesBy(columnName) {
    let notes = valueStorage.getItem('showCompleted')
      ? await noteService.getNotes()
      : await noteService.getNotesNotCompleted()
    if (columnName && columnName !== 'none') {
      notes = await noteService.compareNotesBy(
        notes,
        columnName,
        valueStorage.getItem(columnName)
      )
    }
    this.parsedNotes = notes.map((note) => {
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
    this.showNotes()
  }

  showNotes() {
    this.notesContainer.innerHTML = this.noteTemplateCompiled({
      parsedNotes: this.parsedNotes,
      showDueDate: valueStorage.getItem('showDueDate'),
    })
  }

  initEventHandlers() {
    document.querySelector('#navbar').addEventListener('click', (event) => {
      const { sortBy } = event.target.dataset
      if (sortBy) {
        document
          .querySelector('#navbar')
          .querySelectorAll('a')
          .forEach((htmlElement) => {
            if (htmlElement.dataset.sortBy !== sortBy) {
              htmlElement.classList.remove('active')
              valueStorage.setItem(htmlElement.dataset.sortBy)
            } else if (htmlElement.childNodes.length === 2) {
              htmlElement.removeChild(htmlElement.lastChild)
            }
          })
        event.target.classList.add('active')
        const sortOrder = valueStorage.getItem(sortBy) || 'desc'
        valueStorage.setItem(sortBy, sortOrder === 'desc' ? 'asc' : 'desc')
        event.target.insertAdjacentHTML(
          'beforeend',
          `<i class="fas fa-caret-${sortOrder === 'desc' ? 'up' : 'down'}"></i>`
        )
        this.sortNotesBy(sortBy).catch(console.error)
      }
    })

    const createNoteButton = document.querySelector('#create-note-button')
    const showCompletedToggle = document.querySelector('#show-completed-toggle')
    const showDueDateToggle = document.querySelector('#show-due-date-toggle')

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
      valueStorage.setItem('showCompleted', event.target.checked)
      this.sortNotesBy().catch(console.error)
    })

    showDueDateToggle.addEventListener('click', (event) => {
      this.showDueDate = event.target.checked
      valueStorage.setItem('showDueDate', event.target.checked)
      this.showNotes()
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
      this.sortNotesBy().catch(console.error)
    })

    this.notesContainer.addEventListener('click', (event) => {
      const { deleteNoteId, editNoteId, doneNoteId } = event.target.dataset
      if (doneNoteId) {
        noteService
          .markCompleted(doneNoteId, event.target.checked)
          .catch(console.error)
        this.sortNotesBy().catch(console.error)
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
          this.createEditForm.querySelector('#title').value = title
          this.createEditForm.querySelector('#description').value = description
          this.createEditForm.querySelector('#description').innerHTML =
            description
          this.createEditForm.querySelector('#importance').value = importance
          this.createEditForm.querySelector('#due-date').value = dueDate
            ? convertEpochToDateString(dueDate)
            : ''

          this.createEditForm.open()
        })
      }
    })
  }

  resetForm() {
    this.createEditForm.querySelector('#title').value = ''
    this.createEditForm.querySelector('#description').innerHTML = null
    this.createEditForm.querySelector('#description').value = ''
    this.createEditForm.querySelector('#importance').value = DEFAULT_IMPORTANCE
    this.createEditForm.querySelector('#due-date').value = ''
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
            this.sortNotesBy().catch(console.error)
          })
          .catch((err) => {
            console.log(err)
          })
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
            this.sortNotesBy().catch(console.error)
          })
          .catch((err) => console.log(err))
          .finally(() => {
            delete this.editNoteId
          })
      }
    })
  }

  initialize() {
    this.initEventHandlers()
    this.sortNotesBy().catch(console.error)
  }
}

new NotesController().initialize()
