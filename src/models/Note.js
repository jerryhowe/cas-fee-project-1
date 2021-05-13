export default class Note {
  constructor(title, description, importance, dueDate, done) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.dueDate = dueDate;
    this.done = done;
  }
}
