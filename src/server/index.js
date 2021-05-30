import express from 'express'

import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

import noteRouter from './routes/note-router'

const currentDir = dirname(fileURLToPath(import.meta.url))

const app = express()
const port = 3000

app.use(express.static(join(currentDir, '../public')))
app.use('/note', noteRouter)

app.listen(port, () => {
  console.debug(`Notes app listening at http://localhost:${port}`)
})