import apollo from 'apollo-server-express'
import graphql from 'graphql'
import { noteResolver } from './note/resolver.mjs'
import { noteTypeDef } from './note/typeDef.mjs'

const { GraphQLScalarType, Kind } = graphql
const { gql } = apollo

export const root = gql`
  scalar Date
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`

export const rootResolver = {
  Query: {
    root: () => 'root',
  },

  Mutation: {
    root: () => 'root',
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10)) // ast value is always in string format
      }
      return null
    },
  }),
}

export const typeDefs = [root, noteTypeDef]
export const resolvers = [rootResolver, noteResolver]
