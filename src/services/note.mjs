export class Note {
  constructor(
    // id,
    title,
    description,
    importance,
    dateCreated,
    dueDate,
    completionDate,
    done
  ) {
    // this.id = id
    this.title = title
    this.description = description
    this.importance = importance
    this.dateCreated = dateCreated
    this.dueDate = dueDate
    this.completionDate = completionDate
    this.done = done
  }
}
