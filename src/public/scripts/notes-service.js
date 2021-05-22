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

export function sortNotesByCreationDate(notes, order) {
  return compareNotesBy(notes, 'creationDate', order)
}

export function sortNotesByCompletionDate(notes, order) {
  return compareNotesBy(notes, 'completionDate', order)
}

export function sortNotesByDueDate(notes, order) {
  return compareNotesBy(notes, 'dueDate', order)
}
