export class Note {
  constructor(
    title,
    description,
    importance,
    dateCreated,
    dueDate,
    completionDate,
    done
  ) {
    this.title = title
    this.description = description
    this.importance = importance
    this.dateCreated = dateCreated
    this.dueDate = dueDate
    this.completionDate = completionDate
    this.done = done
  }
}
