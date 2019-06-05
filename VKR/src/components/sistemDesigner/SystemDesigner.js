import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateItem, createSystem, deleteItem } from '../../store/actions/itemActions'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'

class SystemDesigner extends Component {
  state = {
    title: '',
    SistemDescription: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleAddSystem = (e) => {
    e.preventDefault();
    this.props.createSystem(this.state, 'securitySystems', this)

  }





  render() {
    const { auth, toolTypeList } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="container">
        <form onSubmit={this.handleAddSystem} className='white'>
          <h5 className='grey-text text-darken-3'>Создать новый проект</h5>
          <div className='input-field'>
            <label className='active' htmlFor='title'>Название</label>
            <input type='text' id="title" onChange={this.handleChange} value={this.state.title} />
          </div>
          <div className='input-field'>
            <label className='active' htmlFor='SistemDescription'>Описание</label>
            <textarea id='SistemDescription' onChange={this.handleChange} className='materialize-textarea ' value={this.state.content}></textarea>

          </div>

          <div className='input-field'>
            <button className='btn pink lighten-1 z-depth-0'>Добавить проект</button>
          </div>
          

        </form>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateItem: (item, itemType, props) => dispatch(updateItem(item, itemType, props)),
    createSystem: (item, itemType, thisOfComponent) => dispatch(createSystem(item, itemType, thisOfComponent)),
    deleteItem: (item, itemKey, itemType) => dispatch(deleteItem(item, itemKey, itemType))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SystemDesigner)
