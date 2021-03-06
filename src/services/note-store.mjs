import datastore from 'nedb-promise'
import dotenv from 'dotenv'
import { Note } from './note.mjs'

dotenv.config()

export class NoteStore {
  constructor() {
    this.db = datastore({
      filename: process.env.TEST_DATA || './data/notes.db',
      autoload: true,
    })
  }

  async add(title, description, importance, dueDate) {
    const note = new Note(title, description, importance, new Date(), dueDate)
    return this.db.insert(note)
  }

  async update(id, newNote) {
    await this.db.update({ _id: id }, { $set: newNote })
    return this.get(id)
  }

  async delete(id) {
    await this.db.update({ _id: id }, { $set: { dateDeleted: new Date() } })
    return this.get(id)
  }

  async markCompleted(id, completed) {
    const done = completed === undefined ? true : completed
    await this.db.update(
      { _id: id },
      { $set: { done, dateCompleted: done ? new Date() : null } }
    )
    return this.get(id)
  }

  async get(id) {
    return this.db.findOne({ _id: id })
  }

  async all() {
    return this.db.cfind({}).sort({ dateCreated: -1 }).exec()
  }
}

export const noteStore = new NoteStore()
