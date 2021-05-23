export default class Note {
  constructor(
    title,
    description,
    importance,
    creationDate,
    dueDate,
    completionDate,
    done
  ) {
    // generate id for each note...
    this.title = title
    this.description = description
    this.importance = importance
    this.creationDate = creationDate
    this.dueDate = dueDate
    this.completionDate = completionDate
    this.done = done
  }
}
