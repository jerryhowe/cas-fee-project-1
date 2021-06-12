import apollo from 'apollo-server-express'

const { gql } = apollo

export const noteTypeDef = gql`
  type Note {
    _id: String
    title: String
    description: String
    importance: Int
    creationDate: Date
    dueDate: Date
    dateCompleted: Date
    completed: Boolean
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
