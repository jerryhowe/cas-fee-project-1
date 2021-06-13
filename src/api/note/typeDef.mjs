import apollo from 'apollo-server-express'

const { gql } = apollo

export const noteTypeDef = gql`
  type Note {
    _id: String
    title: String
    description: String
    importance: Int
    dateCreated: Date
    dateDeleted: Date
    dueDate: Date
    dateCompleted: Date
    done: Boolean
    state: String
  }

  input AddNoteInput {
    title: String!
    description: String
    importance: Int
    dueDate: Date
  }

  extend type Query {
    Notes: [Note!]!
    Note(id: String!): Note
  }

  extend type Mutation {
    addNote(input: AddNoteInput): Note!
    updateNote(id: String, input: AddNoteInput): Note!
    deleteNote(id: String): Note!
    markCompleted(id: String, completed: Boolean): Note!
  }
`
