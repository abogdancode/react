import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProject, createProject, deleteProject } from '../../store/actions/projectActions'
import { InputFieldList } from './InputFieldList'
import { Redirect } from 'react-router-dom'
import { compose } from 'redux'
import { firestoreConnect } from 'react-redux-firebase'
import CriterionSettings from '../securityTools/CriterionSettings'
import CertificateSettings from '../securityTools/CertificateSettings'

class CreateProject extends Component {
  state = {
    title: '',
    content: '',
    isStateUpdate: false,
    showPopupCriterionSettings: false,
    showPopupCertificateSettings: false,
    currentCriterion: null,
    currentcCertificate: null,
    criterions: [
      {
        criterionId: '0',
        criterionTitle: '',
        criterionWeight: '1',
        minValue: 0,
        maxValue: 1,
        description: ''

      }
    ],
    certificates: [
      {
        certificateId: '0',
        certificateTitle: '',
        certificateWeight: '1',
        minValue: 0,
        maxValue: 1,
        description: ''
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
    //const currentWeight = this.state.criterions[itemId].criterionWeight
    const currentItem = {
      ...this.state.criterions[itemId],
      criterionId: itemId,
      criterionTitle: e.target.value,
      //criterionWeight: currentWeight
    }
    const newCriterions = this.state.criterions
    newCriterions.splice(itemId, 1, currentItem)
    this.setState({
      criterions: [...newCriterions]
    })
  }

  handleChangeWeight = (e) => {
    const itemId = e.target.id.substring(1)
    //const currentTitle = this.state.criterions[itemId].title
    const currentItem = {
      ...this.state.criterions[itemId],
      criterionId: itemId,
      //criterionTitle: currentTitle,
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
      criterionWeight: '1',
      minValue: 0,
      maxValue: 1,
      description: ''
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
    //const currentWeight = this.state.certificates[itemId].certificateWeight
    const currentItem = {
      ...this.state.certificates[itemId],
      certificateId: itemId,
      certificateTitle: e.target.value
    }
    const newCertificates = this.state.certificates
    newCertificates.splice(itemId, 1, currentItem)
    this.setState({
      certificates: [...newCertificates]
    })
  }

  handleChangeWeightCertificates = (e) => {
    const itemId = e.target.id.substring(1)
    //const currentTitle = this.state.certificates[itemId].certificateTitle
    const currentItem = {
      ...this.state.certificates[itemId],
      certificateId: itemId,
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
      certificateWeight: '1',
      minValue: 0,
      maxValue: 1,
      description: ''
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

  handleCriterionSettings = (e) => {
    e.preventDefault();
    const itemId = e.target.id.substring(1)

    this.setState({
      showPopupCriterionSettings: true,
      currentCriterion: this.state.criterions[itemId]
    })
  }

  criterionUpdate = (updatedCriterion) => {
    const criterionId = this.state.currentCriterion.criterionId
    const oldCriterion = this.state.criterions[criterionId]
    const currentItem = {
      criterionId: oldCriterion.criterionId,
      criterionTitle: oldCriterion.criterionTitle,
      criterionWeight: oldCriterion.criterionWeight,
      minValue: updatedCriterion.criterionMinValue,
      maxValue: updatedCriterion.criterionMaxValue,
      description: updatedCriterion.criterionComment
    }
    const newCriterions = this.state.criterions
    newCriterions.splice(criterionId, 1, currentItem)
    this.setState({
      showPopupCriterionSettings: false,
      criterions: [...newCriterions]
    })
  }

  







  handleCertificateSettings = (e) => {
    e.preventDefault();
    const itemId = e.target.id.substring(1)

    this.setState({
      showPopupCertificateSettings: true,
      currentCertificate: this.state.certificates[itemId]
    })
  }

  certificateUpdate = (updatedCertificate) => {
    const certificateId = this.state.currentCertificate.certificateId
    const oldCertificate = this.state.certificates[certificateId]
    const currentItem = {
      certificateId: oldCertificate.certificateId,
      certificateTitle: oldCertificate.certificateTitle,
      certificateWeight: oldCertificate.certificateWeight,
      minValue: updatedCertificate.certificateMinValue,
      maxValue: updatedCertificate.certificateMaxValue,
      description: updatedCertificate.certificateComment
    }
    const newCertificates = this.state.certificates
    newCertificates.splice(certificateId, 1, currentItem)
    this.setState({
      showPopupCertificateSettings: false,
      certificates: [...newCertificates]
    })
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
        {this.state.showPopupCriterionSettings ?
          <CriterionSettings projectState={this.state} onDone={this.criterionUpdate} />

          :null
  }

        {this.state.showPopupCertificateSettings ?
          <CertificateSettings projectState={this.state} onDone={this.certificateUpdate} />

          :null
        }

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
            handleSettings={this.handleCriterionSettings}
          />
          <a className="btn-floating btn-small waves-effect waves-light green" onClick={this.addCriterion}><i className="material-icons">add</i></a>

          
          <div className="row">
              <InputFieldList
                title={'какие сертификаты может иметь данное СЗИ'}
                placeholder={'сертификат'}
                type={'certificate'}
                items={this.state.certificates}
                remove={this.removeCertificate}
                onChange={this.handleChangeCertificates}
                onWeightChange={this.handleChangeWeightCertificates}
                handleSettings={this.handleCertificateSettings}
              />

          </div>
          <a className="btn-floating right btn-small waves-effect waves-light red" onClick={this.handleDeleteProject}><i className="material-icons">delete</i></a>

          <a className="btn-floating btn-small waves-effect waves-light green" onClick={this.addCertificate}><i className="material-icons">add</i></a>
          {this.createOrUpdate(project)}
          

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
