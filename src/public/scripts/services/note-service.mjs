import { graphqlService } from './graphql-service.mjs'

class NoteService {
  async addNote(title, description, importance, dueDate) {
    const query = `mutation {
                    addNote(input: {
                        title: "${title}",
                        description: "${description}",
                        importance: ${importance},
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
                        description: "${description}",
                        importance: ${importance},
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
    console.log(query)
    return (await graphqlService.ajax(query)).Note
  }

  async deleteNote(id) {
    const query = `mutation {
        deleteNote(id: "${id}") {
          _id
        }
    }`
    console.log(query)
    return await graphqlService.ajax(query)
  }

  async markCompleted(id, completed) {
    const query = `mutation {
        markCompleted(id: "${id}", completed: ${completed}) {
          _id
        }
    }`
    console.log(query)
    return await graphqlService.ajax(query)
  }
}

export const noteService = new NoteService()
