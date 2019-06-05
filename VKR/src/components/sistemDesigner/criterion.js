export class Criterion {

  constructor(title, value, verificatedValue, weight, id, itselfKey ) {
    this.id = id
    this.title=title
    this.value=value
    this.verificatedValue = verificatedValue
    this.weight = weight
    this.itselfKey = itselfKey
  }
}
