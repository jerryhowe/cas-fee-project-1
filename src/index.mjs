import express from 'express'
import bodyParser from 'body-parser'

import path, { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import apollo from 'apollo-server-express'
import dotenv from 'dotenv'
import { resolvers, typeDefs } from './api/root.mjs'

dotenv.config()
const currentDir = dirname(fileURLToPath(import.meta.url))

const app = express()

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

const port = process.env.PORT || 3000
const hostname = process.env.HOST || '127.0.0.1'
const protocol = process.env.PROTOCOL || 'http'

app.listen(port, hostname, () => {
  console.log(`Server running at ${protocol}://${hostname}:${port}/`)
})
