import { graphqlService } from './graphql-service.mjs'

class NoteService {
  async addNote(title, description, importance, dueDate) {
    const query = `mutation {
                    addNote(input: {
                        title: ${title},
                        description: ${description},
                        importance: ${importance},
                        dueDate: ${dueDate}) {
                          _id
                      }
                    }`
    return await graphqlService.ajax(query)
  }

  async getNotes() {
    const query = `{
                    Notes{
                        _id,
                        title,
                        description,
                        importance,
                        dueDate
                      }
                    }`
    return (await graphqlService.ajax(query)).Notes
  }

  async getNote(id) {
    const query = `{
        Note(id: ${id}) {
          title,
          description,
          importance,
          creationDate,
          dueDate,
          dateCompleted,
          completed
        }
    }`
    return (await graphqlService.ajax(query)).Note
  }

  async markCompleted(id) {
    const query = `{
        Note(id: ${id}) {
          _id
        }
    }`
    return await graphqlService.ajax(query)
  }
}

export const noteService = new NoteService()
