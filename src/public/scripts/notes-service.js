function compareNotesByImportanceDesc(n1, n2) {
  return n2.importance - n1.importance
}
function compareNotesByImportanceAsc(n1, n2) {
  return n1.importance - n2.importance
}

export function sortNotesByImportance(notes, order) {
  if (order === 'DESC') {
    notes.sort(compareNotesByImportanceDesc)
  } else {
    notes.sort(compareNotesByImportanceAsc)
  }
}
