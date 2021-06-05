import {notes} from "../../__fixtures__/mock/mock-notes.mjs";
import {convertToNearFutureString, toStringWithLocaleWithWeekday} from "../util/date-util.mjs";

class NotesController {
    constructor() {
        this.noteTemplateCompiled = Handlebars.compile(
            document.getElementById('notes-list-template').innerHTML
        )
        this.notesContainer = document.getElementById('notes-container')
    }

    showNotes() {
        const parsedNotes = notes.map((note) => {
            const {title, description, importance, creationDate, dueDate, completionDate, done} = note
            return {
                title,
                description,
                importance: "!".repeat(importance),
                creationDate: convertToNearFutureString(creationDate),
                dueDate: convertToNearFutureString(dueDate),
                completionDate: convertToNearFutureString(completionDate),
                done: true
            }
        });
        this.notesContainer.innerHTML = this.noteTemplateCompiled({
            parsedNotes
        })
    }

    initEventHandlers() {
        this.notesContainer.addEventListener('click', (event) => {
                console.log('click detected!')
                const editNoteId = Number(event.target.dataset.editNoteId);
                const deleteNoteId = Number(event.target.dataset.deleteNoteId);
                editNoteId && console.log(`EDIT CLICKED with ID ${editNoteId}`);
                deleteNoteId && console.log(`DELETE CLICKED with ID ${deleteNoteId}`);
            }
        );
    }

    initialize() {
        this.initEventHandlers()
        this.showNotes()
    }
}

new NotesController().initialize()
