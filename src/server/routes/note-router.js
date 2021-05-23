import express from 'express'
import * as noteController from '../controllers/note-controller'

const router = express.Router()

// [C]REATE
router.put('/', noteController.createNote)
// [R]EAD
router.get('/', noteController.getAllNotes)
router.get('/:id', noteController.getNoteById)
// [U]PDATE
router.patch('/', noteController.updateNote)

// [D]ELETE
router.delete('/:id', noteController.deleteNote)

export default router
