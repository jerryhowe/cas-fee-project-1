import { findNoteById } from '../service/notes-service'
import { notes } from '../../__fixtures__/mock/mock-notes'

// Display list of all Notes.

export function createNote(req, res) {
  // TODO : to be implemented
  res.json(req.body).send()
}

export function getAllNotes(req, res) {
  res.json(notes).send()
}

export function getNoteById(req, res) {
  const note = findNoteById(notes, req.params.id)
  if (note) {
    res.json(note)
  }
  res.status(404).send()
}

export function updateNote(req, res) {
  // TODO : to be implemented
  res.json(req.body)
}

export function deleteNote(req, res) {
  // TODO : to be implemented
  res.status(200).send()
}
