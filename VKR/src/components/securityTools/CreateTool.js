import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProject, createProject, deleteProject } from '../../store/actions/projectActions'
import { InputFieldList } from '../projects/InputFieldList'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'

class CreateTool extends Component {
  state = {
    title: '',
    content: '',
    isStateUpdate: false,
    criterions: [
      {
        criterionId: '0',
        criterionTitle: '',
        criterionWeight: '1'
      }
    ],
    certificates: [
      {
        certificateId: '0',
        certificateTitle: '',
        certificateWeight: '1'
      }
    ]
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleChangeCriterions = (e) => {
    const itemId = e.target.id.substring(1)
    const currentWeight = this.state.criterions[itemId].criterionWeight
    const currentItem = {
      criterionId: itemId,
      criterionTitle: e.target.value,
      criterionWeight: currentWeight
    }
    const newCriterions = this.state.criterions
    newCriterions.splice(itemId, 1, currentItem)
    this.setState({
      criterions: [...newCriterions]
    })
  }

  handleChangeWeight = (e) => {
    const itemId = e.target.id.substring(1)
    const currentTitle = this.state.criterions[itemId].title
    const currentItem = {
      criterionId: itemId,
      criterionTitle: currentTitle,
      criterionWeight: e.target.value
    }
    const newCriterions = this.state.criterions
    newCriterions.splice(itemId, 1, currentItem)
    this.setState({
      criterions: [...newCriterions]
    })
  }

  addCriterion = e => {
    e.preventDefault()
    const newCriterion = {
      criterionId: this.state.criterions.length,
      criterionTitle: '',
      criterionWeight: '1'
    }

    const newCriterions = [...this.state.criterions, newCriterion]
    this.setState({
      criterions: newCriterions
    })
  }

  removeCriterion = (e) => {
    e.preventDefault()
    const itemId = e.target.id.substring(1)
    let newCriterions = this.state.criterions
    newCriterions.splice(itemId, 1)
    let count = 0
    newCriterions.map(criterion => {
      criterion.criterionId = count
      count++
    })
    this.setState({
      criterions: [...newCriterions]
    })
  }



  handleChangeCertificates = (e) => {
    const itemId = e.target.id.substring(1)
    const currentWeight = this.state.certificates[itemId].certificateWeight
    const currentItem = {
      certificateId: itemId,
      certificateTitle: e.target.value,
      certificateWeight: currentWeight
    }
    const newCertificates = this.state.certificates
    newCertificates.splice(itemId, 1, currentItem)
    this.setState({
      certificates: [...newCertificates]
    })
  }

  handleChangeWeightCertificates = (e) => {
    const itemId = e.target.id.substring(1)
    const currentTitle = this.state.certificates[itemId].certificateTitle
    const currentItem = {
      certificateId: itemId,
      certificateTitle: currentTitle,
      certificateWeight: e.target.value
    }
    const newCertificates = this.state.certificates
    newCertificates.splice(itemId, 1, currentItem)
    this.setState({
      certificates: [...newCertificates]
    })
  }

  addCertificate = e => {
    e.preventDefault()
    const newCriterion = {
      certificateId: this.state.certificates.length,
      certificateTitle: '',
      certificateWeight: '1'
    }

    const newCertificates = [...this.state.certificates, newCriterion]
    this.setState({
      certificates: newCertificates
    })
  }

  removeCertificate = (e) => {
    e.preventDefault()
    const itemId = e.target.id.substring(1)
    let newCertificates = this.state.certificates
    newCertificates.splice(itemId, 1)
    let count = 0
    newCertificates.map(certificate => {
      certificate.certificateId = count
      count++
    })
    this.setState({
      certificates: [...newCertificates]
    })
  }

  handleDeleteProject = (e) => {
    e.preventDefault();
    this.props.deleteProject(this.props)
    this.props.history.push('/');
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state)
    this.props.history.push('/');
  }

  handleSubmitUpdate = (e) => {
    e.preventDefault();
    this.props.updateProject(this.state, this.props)
    this.props.history.push('/');
  }

  updateState = (project) => {
    if (!this.state.isStateUpdate) {
      this.setState({
        ...project,
        isStateUpdate: true
      })
    }
  }

  createOrUpdate = (project) => {
    if (project) {
      return (
        <div className='input-field'>
          <button className='btn pink lighten-1 z-depth-0'>Изменить СЗИ</button>
        </div>
      )
    } else {
      return (
        <div className='input-field'>
          <button className='btn pink lighten-1 z-depth-0'>Добавить СЗИ</button>
        </div>
      )
    }
  }
  componentDidMount() {
    const project = this.props.project
    if (project) {
      this.updateState(project)
    }
  }
  render() {
    const { auth, project } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    let formHeader = 'Добавление нового типа СЗИ'
    let createOrUpdateAction
    if (project) {
      formHeader = 'Изменение типа СЗИ'
      createOrUpdateAction = this.handleSubmitUpdate
    } else {
      createOrUpdateAction = this.handleSubmit
    }



    return (
      <div className="container">
        <form onSubmit={createOrUpdateAction} className='white'>
          <h5 className='grey-text text-darken-3'>{formHeader}</h5>
          <div className='input-field'>
            <label className='active' htmlFor='title'>Название</label>
            <input type='text' id="title" onChange={this.handleChange} value={this.state.title} />
          </div>
          <div className='input-field'>
            <label className='active' htmlFor='content'>Описание и характеристики</label>
            <textarea id='content' onChange={this.handleChange} className='materialize-textarea ' value={this.state.content}></textarea>

          </div>
          <InputFieldList
            title={'Критерии оценки качества'}
            placeholder={'кртерий'}
            type={'criterion'}
            items={this.state.criterions}
            remove={this.removeCriterion}
            onChange={this.handleChangeCriterions}
            onWeightChange={this.handleChangeWeight}
          />
          <a className="btn-floating btn-small waves-effect waves-light green" onClick={this.addCriterion}><i className="material-icons">add</i></a>

          <InputFieldList
            title={'какие сертификаты может иметь данное СЗИ'}
            placeholder={'сертификат'}
            type={'certificate'}
            items={this.state.certificates}
            remove={this.removeCertificate}
            onChange={this.handleChangeCertificates}
            onWeightChange={this.handleChangeWeightCertificates}
          />

          <a className="btn-floating btn-small waves-effect waves-light green" onClick={this.addCertificate}><i className="material-icons">add</i></a>
          {this.createOrUpdate(project)}
          <a className="btn-floating right btn-small waves-effect waves-light red" onClick={this.handleDeleteProject}><i className="material-icons">delete</i></a>

        </form>

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;

  return {
    project: project,
    projects: projects,
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProject: (project, props) => dispatch(updateProject(project, props)),
    createProject: (project) => dispatch(createProject(project)),
    deleteProject: (project) => dispatch(deleteProject(project))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
