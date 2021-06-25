import { noteStore } from '../../services/note-store.mjs'

export const noteResolver = {
  Query: {
    Notes: () => noteStore.all(),
    Note: (obj, args) => noteStore.get(args.id),
  },

  Mutation: {
    addNote: (obj, args) =>
      noteStore.add(
        args.input.title,
        args.input.description,
        args.input.importance,
        args.input.dueDate
      ),
    updateNote: (obj, args) => noteStore.update(args.id, args.input),
    deleteNote: (obj, args) => noteStore.delete(args.id),
    markCompleted: (obj, args) =>
      noteStore.markCompleted(args.id, args.completed),
  },
}
