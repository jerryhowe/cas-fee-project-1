import express from 'express'
import bodyParser from 'body-parser'

import path, { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import apollo from 'apollo-server-express'
import dotenv from 'dotenv'
import { resolvers, typeDefs } from './api/root.mjs'

const app = express()

dotenv.config()
// GraphQL setup
const { ApolloServer } = apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
})
server.applyMiddleware({ app, path: '/graphql' })

// front-end application setup (html/css/js)
const currentDir = dirname(fileURLToPath(import.meta.url))
app.use(express.static(join(currentDir, './public')))
app.use(express.static(path.resolve('public/html')))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.sendFile('/html/index.html', { root: `${currentDir}/public/` })
})

const port = process.env.PORT || 3000
const hostname = process.env.HOST || '127.0.0.1'
const protocol = 'http'
app.listen(port, hostname, () => {
  console.log(`Server running at ${protocol}://${hostname}:${port}/`)
})
