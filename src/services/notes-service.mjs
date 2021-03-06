export function findNoteById(notes, id) {
  return notes.find((note) => parseInt(id, 10) === parseInt(note.id, 10))
}

// default order is ascending
function compareNotesBy(notes, property, order) {
  return notes
    .slice()
    .sort((n1, n2) =>
      order === 'DESC'
        ? n2[property] - n1[property]
        : n1[property] - n2[property]
    )
}

export function sortNotesByImportance(notes, order) {
  return compareNotesBy(notes, 'importance', order)
}

export function sortNotesBydateCreated(notes, order) {
  return compareNotesBy(notes, 'dateCreated', order)
}

export function sortNotesByCompletionDate(notes, order) {
  return compareNotesBy(notes, 'completionDate', order)
}

export function sortNotesByDueDate(notes, order) {
  return compareNotesBy(notes, 'dueDate', order)
}
