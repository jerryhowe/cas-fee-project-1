import { graphqlService } from './graphql-service.mjs'

class NoteService {
  async addNote(title, description, importance, dueDate) {
    const query = `mutation {
                    addNote(input: {
                        title: "${title}",
                        description: """${description}""",
                        ${this.importanceOrEmptyString(importance)}
                        dueDate: ${dueDate}}) {
                          _id
                      }
                    }`
    return await graphqlService.ajax(query)
  }

  async updateNote(id, title, description, importance, dueDate) {
    const query = `mutation {
                    updateNote(id: "${id}", input: {
                        title: "${title}",
                        description: """${description}""",
                        ${this.importanceOrEmptyString(importance)}
                        dueDate: ${dueDate}}) {
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
                        dateCompleted,
                        dateDeleted,
                        dateCreated,
                        dueDate,
                        done
                      }
                    }`
    return (await graphqlService.ajax(query)).Notes
  }

  async getNotesNotCompleted() {
    return (await this.getNotes()).filter((note) => note.done !== true)
  }

  async getNote(id) {
    const query = `{
        Note(id: "${id}") {
          title,
          description,
          importance,
          dateCreated,
          dueDate,
          dateCompleted,
          done
        }
    }`
    return (await graphqlService.ajax(query)).Note
  }

  async deleteNote(id) {
    const query = `mutation {
        deleteNote(id: "${id}") {
          _id
        }
    }`
    return await graphqlService.ajax(query)
  }

  async markCompleted(id, completed) {
    const query = `mutation {
        markCompleted(id: "${id}", completed: ${completed}) {
          _id
        }
    }`
    return await graphqlService.ajax(query)
  }

  async compareNotesBy(notes, property, order) {
    return notes
      .slice()
      .sort((n1, n2) =>
        order.toUpperCase() === 'DESC'
          ? n2[property] - n1[property]
          : n1[property] - n2[property]
      )
  }

  importanceOrEmptyString(importance) {
    return importance ? `importance: ${importance},` : ''
  }
}

export const noteService = new NoteService()
