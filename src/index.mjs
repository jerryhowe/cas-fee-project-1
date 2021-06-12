import express from 'express'
import bodyParser from 'body-parser'

import path, { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import apollo from 'apollo-server-express'
import { resolvers, typeDefs } from './api/root.mjs'

const currentDir = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 4000

app.use(express.static(join(currentDir, './public')))

const { ApolloServer } = apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

app.use(express.static(path.resolve('public/html')))
app.use(express.static(path.resolve('public')))

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile('/html/index.html', { root: `${currentDir}/public/` })
})

server.applyMiddleware({ app, path: '/graphql' })

const hostname = '127.0.0.1'
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
