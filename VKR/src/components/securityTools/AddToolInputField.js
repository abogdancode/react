
import { Link } from 'react-router-dom'
import { DropItems } from './DropItems'

import React, { Component } from 'react'
export class AddToolInputField extends Component {
  state = {

  };
  handleValueChange = (e) => {

    this.setState({
      itemValue: e.target.value.replace(",", ".")
      
    })
  }

  getDataFromDrop = (data) => {
    this.setState({
      itemTitle: data.itemTitle,
      itemDescription: data.itemDescription,
      typeOfItemId: data.typeOfItemId
    })
  }

  saveItem = () => {
    let dataToSave = {
      ...this.state,
      toolTypeId: this.props.toolTypeId,
      toolId: this.props.toolId
    }
    this.props.createItem(dataToSave, this.props.itemType)
    console.log(this.state.typeOfItemId)
    this.props.deleteItemFromState(this.state.typeOfItemId, this.props.itemType)
    this.props.closePopup()
    
  }

  render() {
    return (
      <div className='popup container section project-ditails'>
        <div className='card'>
          <div className='input-field row '>
            <div className='col s6'>

              <DropItems itemType={this.props.itemType} passData={this.getDataFromDrop} items={this.props.items} />
              
            </div>
            <div className='col s4'>
              <label htmlFor={'value'}>численное значение</label>
              <textarea id={'value'} onChange={this.handleValueChange} className='materialize-textarea ' value={this.state.value} ></textarea>
              <p>{this.props.description}</p>
            </div>

            <div className='col s1'>
              <a onClick={this.saveItem} className="btn-floating  btn-medium waves-effect waves-light blue"><i  className="material-icons">save</i></a>
            </div>

          </div>

          
              
        </div>
      </div>
    )
  }
}
