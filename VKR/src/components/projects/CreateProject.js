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
    systemId: this.props.match.params.systemId,
    isStateUpdate: false,
    showPopupCriterionSettings: false,
    showPopupCertificateSettings: false,
    currentCriterion: null,
    currentcCertificate: null,
    idCounter: 100,
    criterions: [
{

      criterionId: "100",
criterionTitle: "Стоимость закупки, руб.",
criterionWeight: "-0.6",
description: "Указать стоимость закупки в рублях. ",
maxValue: "0",
minValue: "0",
    },{

      criterionId: "101",
criterionTitle: "Поддержка платформ ОС",
criterionWeight: "0.5",
description: "Указать значение от 1 до 5",
maxValue: "5",
minValue: "1",
},{

      criterionId: "102",
criterionTitle: "Совместимость с другими решениями в части защиты информации",
criterionWeight: "0.5",
description: "Указать значение от 1 до 5",
maxValue: "5",
minValue: "1",
},{

      criterionId: "103",
criterionTitle: "Системные требования",
criterionWeight: "-0.6",
description: "Указать значение от 1 до 10. Чем выше системные требования - тем выше значение.",
maxValue: "10",
minValue: "1",
},{

      criterionId: "104",
criterionTitle: "Сложность внедрения",
criterionWeight: "-0.5",
description: "Указать значение от 1 до 5. Чем больше сложность внедрения - тем выше значение",
maxValue: "5",
minValue: "1",
},{

      criterionId: "105",
criterionTitle: "Удобство применения (Usability) ",
criterionWeight: "0.4",
description: "Указать значение от 1 до 5",
maxValue: "5",
minValue: "1",
},{

      criterionId: "106",
criterionTitle: "Комплексность средства защиты информации",
criterionWeight: "0.4",
description: "Указать значение от 1 до 5",
maxValue: "5",
minValue: "1",
}

    ],
    certificates: [
    
      {
        certificateId: "100",
        certificateTitle: "РДВ (ТУ)",
        certificateWeight: "0.25",
        description: "Если сертификат имеется - то значение = 1",
        maxValue: 1,
        minValue: 0
      },
{
        certificateId: "107",
        certificateTitle: "СВТ",
        certificateWeight: "0.25",
        description: "В1 - 1\nВ2 - 0.5\nВ3 - 0.33\nВ4 - 0.25\nВ5 - 0.20\nВ6 - 0.15\nЕсли отсутствует = 0",
        maxValue: 1,
        minValue: 0},

{        certificateId: "108",
        certificateTitle: "НСД",
        certificateWeight: "1",
        description: "3А - 4\n3Б - 3.5\n2А - 3\n2Б - 2.5\n1А - 2\n1Б - 1.5\n1В - 1.30\n1Г - 1.25\n1Д - 1.20\nЕсли отсутствует = 0",
        maxValue: "4",
        minValue: 0},
{
        certificateId: "109",
        certificateTitle: "НДВ",
        certificateWeight: "0.25",
        description: "H1 - 1\nH2 - 0.5\nH3 - 0.33\nH4 - 0.25\nH5 - 0.20\nотсутствует = 0",
        maxValue: 1,
        minValue: 0},
{
        certificateId: "110",
        certificateTitle: "МЭ",
        certificateWeight: "0.25",
        description: "M1 - 1\nM2 - 0.5\nM3 - 0.33\nM4 - 0.33\nM5 - 0.2\nотсутствует = 0",
        maxValue: 1,
        minValue: 0},
        {
        certificateId: "111",
        certificateTitle: "ЭЦП",
        certificateWeight: "0.25",
        description: "1 - 1\n2 - 0.5\n3 - 0.33\n4 - 0.25\n5 - 0.2\nОтсутствует = 0",
        maxValue: 1,
        minValue: 0
        },
        {
          certificateId: "112",
          certificateTitle: "ПДн",
          certificateWeight: "0.25",
          description: "К1 - 1\nК2 - 0.5\nК3 - 0.33\nК4 - 0.25\nОтсутствует = 0",
          maxValue: 1,
          minValue: 0
        }
    ]
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  indexOfItem = (items,type, id) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i][type+'Id'] == id)
        return i
    }
  }

  handleChangeCriterions = (e) => {
    const itemId = e.target.id.substring(1)
    const newCriterions = this.state.criterions
    let indexOfCriterion = this.indexOfItem(newCriterions, 'criterion', itemId)
    const currentItem = {
      ...this.state.criterions[indexOfCriterion],
      criterionId: itemId,
      criterionTitle: e.target.value,
    }
    newCriterions.splice(indexOfCriterion, 1, currentItem)
    this.setState({
      criterions: [...newCriterions]
    })
  }

  handleChangeWeight = (e) => {
    const itemId = e.target.id.substring(1)
    const newCriterions = this.state.criterions
    let indexOfCriterion = this.indexOfItem(newCriterions, 'criterion', itemId)
    const currentItem = {
      ...this.state.criterions[indexOfCriterion],
      criterionId: itemId,

      criterionWeight: e.target.value.replace(",", ".")
    }
    
    
    newCriterions.splice(indexOfCriterion, 1, currentItem)
    this.setState({
      criterions: [...newCriterions]
    })
  }

  addCriterion = e => {
    e.preventDefault()
    const newCriterion = {
      
      criterionId: (this.state.idCounter+1),
      criterionTitle: '',
      criterionWeight: '1',
      minValue: 0,
      maxValue: 1,
      description: ''
    }
    const newCriterions = [...this.state.criterions, newCriterion]
    this.setState({
      criterions: newCriterions,
      idCounter: (this.state.idCounter+1)
    })
  }

  removeCriterion = (e) => {
    e.preventDefault()
    const itemId = e.target.id.substring(1)
    let newCriterions = this.state.criterions
    let indexOfCriterion = this.indexOfItem(newCriterions, 'criterion', itemId)
    let conf = window.confirm("Вы уверены?")
    if (conf) {
      
      newCriterions.splice(indexOfCriterion, 1)
      this.setState({
        criterions: [...newCriterions]
      })
      alert("критерий удален");
    } else {
      alert("хорошо, критерий не удален");
    }  
    
  }



  handleChangeCertificates = (e) => {
    const itemId = e.target.id.substring(1)
    
    const newCertificates = this.state.certificates
    let indexOfCertificate = this.indexOfItem(newCertificates, 'certificate', itemId)

    const currentItem = {
      ...this.state.certificates[indexOfCertificate],
      certificateId: itemId,
      certificateTitle: e.target.value
    }
    newCertificates.splice(indexOfCertificate, 1, currentItem)
    this.setState({
      certificates: [...newCertificates]
    })
  }

  handleChangeWeightCertificates = (e) => {
    const itemId = e.target.id.substring(1)
    const newCertificates = this.state.certificates
    let indexOfCertificate = this.indexOfItem(newCertificates, 'certificate', itemId)
    const currentItem = {
      ...this.state.certificates[indexOfCertificate],
      certificateId: itemId,
      certificateWeight: e.target.value.replace(",", ".")
    }
    
    newCertificates.splice(indexOfCertificate, 1, currentItem)
    this.setState({
      certificates: [...newCertificates]
    })
  }

  addCertificate = e => {
    e.preventDefault()
    const newCriterion = {
      certificateId: (this.state.idCounter + 1),
      certificateTitle: '',
      certificateWeight: '1',
      minValue: 0,
      maxValue: 1,
      description: ''
    }

    const newCertificates = [...this.state.certificates, newCriterion]
    this.setState({
      certificates: newCertificates,
      idCounter: (this.state.idCounter + 1)
    })
  }

  removeCertificate = (e) => {
    e.preventDefault()
    const itemId = e.target.id.substring(1)
    let newCertificates = this.state.certificates
    let indexOfCertificate = this.indexOfItem(newCertificates, 'certificate', itemId)
    
    if (window.confirm("Вы уверены?")) {
      newCertificates.splice(indexOfCertificate, 1)
      this.setState({
        certificates: [...newCertificates]
      })
      alert("Сертификат удален!");
    } else {
      alert("Хорошо, сертификат не удален");
    }  
  }

  handleDeleteProject = (e) => {
    e.preventDefault();
    if (window.confirm("Вы уверены?")) {
      this.props.deleteProject(this.props)
      this.props.history.push('/toolTypeDashboard/' + this.state.systemId);
      alert("Проект удален!");
    } else {
      alert("Хорошо, проект не удален");
    }  
    
    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProject(this.state, this)
  }

  handleSubmitUpdate = (e) => {
    e.preventDefault();
    this.props.updateProject(this.state, this.props)
    this.props.history.push('/toolTypeDashboard/' + this.state.systemId);
  }



  updateState = (project) => {
    if (!this.state.isStateUpdate) {
      this.setState({
        ...project,
        criterions: [...project.criterions],
        certificates: [...project.certificates],
        isStateUpdate: true
      })

      
    }
  }

  createOrUpdate = (project) => {
    
    if (project) {
 
      if (this.props.match.path == "/copyType/:systemId/:id") {
        return (
          <div className='input-field'>
            <button className='btn pink lighten-1 z-depth-0'>Сохранить как новое СЗИ</button>
          </div>
        )
      } else {
        return (
          <div className='input-field'>
            <button className='btn pink lighten-1 z-depth-0'>Изменить СЗИ</button>
          </div>
        )
      }
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
    let indexOfCriterion = this.indexOfItem(this.state.criterions, 'criterion', itemId)
    this.setState({
      showPopupCriterionSettings: true,
      currentCriterion: this.state.criterions[indexOfCriterion]
    })
  }

  criterionUpdate = (updatedCriterion) => {
    const criterionId = this.state.currentCriterion.criterionId
    let indexOfCriterion = this.indexOfItem(this.state.criterions, 'criterion', criterionId)
    const oldCriterion = this.state.criterions[indexOfCriterion]
    const currentItem = {
      criterionId: oldCriterion.criterionId,
      criterionTitle: oldCriterion.criterionTitle,
      criterionWeight: oldCriterion.criterionWeight,
      minValue: updatedCriterion.criterionMinValue,
      maxValue: updatedCriterion.criterionMaxValue,
      description: updatedCriterion.criterionComment
    }
    const newCriterions = this.state.criterions
    newCriterions.splice(indexOfCriterion, 1, currentItem)
    this.setState({
      showPopupCriterionSettings: false,
      criterions: [...newCriterions]
    })
  }

  







  handleCertificateSettings = (e) => {
    e.preventDefault();
    const itemId = e.target.id.substring(1)
    let indexOfCertificate = this.indexOfItem(this.state.certificates, 'certificate', itemId)
    this.setState({
      showPopupCertificateSettings: true,
      currentCertificate: this.state.certificates[indexOfCertificate]
    })
  }

  certificateUpdate = (updatedCertificate) => {
    const certificateId = this.state.currentCertificate.certificateId
    let indexOfCertificate = this.indexOfItem(this.state.certificates, 'certificate', certificateId)
    const oldCertificate = this.state.certificates[indexOfCertificate]
    const currentItem = {
      certificateId: oldCertificate.certificateId,
      certificateTitle: oldCertificate.certificateTitle,
      certificateWeight: oldCertificate.certificateWeight,
      minValue: updatedCertificate.certificateMinValue,
      maxValue: updatedCertificate.certificateMaxValue,
      description: updatedCertificate.certificateComment
    }
    const newCertificates = this.state.certificates
    newCertificates.splice(indexOfCertificate, 1, currentItem)
    this.setState({
      showPopupCertificateSettings: false,
      certificates: [...newCertificates]
    })
  }


  render() {
    let descRowCountPercents = 1
    if (this.state.content) {
      descRowCountPercents = Number(2 * this.state.content.lineCount()) + 'em'
    } 
    const { auth, project } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    let formHeader = 'Добавление нового типа СЗИ'
    let createOrUpdateAction
    if (project) {
      console.log(project)
      if (this.props.match.path == "/copyType/:systemId/:id") {
        createOrUpdateAction = this.handleSubmit
      } else {
        formHeader = 'Изменение типа СЗИ'
        createOrUpdateAction = this.handleSubmitUpdate
      }
      
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
            <textarea
              style={{ height: descRowCountPercents }}
              id='content' onChange={this.handleChange} className='materialize-textarea ' value={this.state.content}></textarea>

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
                title={'Уровни контроля качества по данным сертификатов соответствия'}
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
    createProject: (project, thisOfComponent) => dispatch(createProject(project, thisOfComponent)),
    deleteProject: (project) => dispatch(deleteProject(project))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
