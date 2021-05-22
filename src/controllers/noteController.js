import Note from '../models/Note'

// Display list of all Notes.

export function createNote(req, res) {
  // TODO : to be implemented
  res.json(req.body).send()
}

export function getAllNotes(req, res) {
  const notes = []
  for (let i = 0; i < 10; i++) {
    notes.push(new Note('title', 'description', 5, new Date(), true))
  }
  res.json(notes).send()
}

export function getNoteById(req, res) {
  console.log(req.params.id)
  res.json(new Note('title', 'description', 5, new Date(), true)).send()
}

export function updateNote(req, res) {
  // TODO : to be implemented
  res.json(req.body).send()
}

export function deleteNote(req, res) {
  // TODO : to be implemented
  res.status(200).send()
}
