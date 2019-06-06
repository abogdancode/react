export class Certificate {

  constructor(title, value, verificatedValue, weight, commonWeight, id, itselfKey) {
    this.id = id
    this.title=title
    this.value=value
    this.verificatedValue = verificatedValue
    this.weight = weight
    this.itselfKey = itselfKey
    this.commonWeight = commonWeight
  }
}
