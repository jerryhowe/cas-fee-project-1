/**
 * Food storage facilities which persists and loads DTOs/POJOs (data transfer objects).
 * This logic represents the data layer/driver for the Zoo application.
 */
export class NoteStorage {
  constructor() {
    const note = JSON.parse(localStorage.getItem('noteStorage') || '[ ]')
    this.note = note
    localStorage.setItem('noteStorage', JSON.stringify(note))
  }

  getAll() {
    return this.note
  }

  update(note) {
    localStorage.setItem('noteStorage', JSON.stringify(this.note))
    return this.note
  }
}
