import React, { Component } from 'react'

export class ItemOfAddingTool extends Component {
  state = {

  }
  
  deleteAction = () =>{
    this.props.deleteAction(this.props.item,this.props.itemType)
  }
  render() {
    
    const { item, itemType, deleteAction } = this.props
    return (
      <li className="row collection-item">
        <div className="card-content col s9 m9 ">
          {item.itemTitle}
        </div>
        <div className="card-content col s2 m2">
          {item.itemValue}
        </div>
        <div className="card-content col s1 m1">
          <a className="btn-floating btn-small waves-effect waves-light green"
            onClick={this.deleteAction}><i className="material-icons">delete</i></a>
        </div>
      </li>
    )
  }
  
}

