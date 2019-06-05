import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { deleteProject } from '../../store/actions/projectActions'
import { updateItem, createItem, deleteItem, createTool, updateTool, setProperty } from '../../store/actions/itemActions'
import { ToolCriterionList } from './ToolCriterionList'
import { AddToolInputField } from './AddToolInputField'
import { ToggleButtonTool } from './ToggleButtonTool'


class AddSecurityTool extends Component {
  state = {
    toolTypeId: this.props.match.params.toolTypeId,
    toolTitle: '',
    toolDescription: '',
    showPopupCriterions: false,
    showPopupCertificates: false,
    showPopupList: false,
    stateUpdated: false,
    criterionList: [],
    certificateList:[],
    buttonType: 'SAVE'
  }

  shouldComponentUpdate() {
    
    return true;
  }
  componentDidUpdate() {
    


      
      
      if (this.props.project) {
        const currentTypesOfCriterion = this.props.project.criterions
        const currentTypesOfCertificate = this.props.project.certificates
        console.log(this.props.project)
        

          

          if ((this.state.stateUpdated === false) && (this.props.currentTool || currentTypesOfCriterion || currentTypesOfCertificate)) {
            const currentTool = this.props.currentTool

          if (currentTool) {
            console.log(currentTool)
            this.setState({
              ...currentTool,
              criterionList: currentTool.criterionList,
              certificateList: currentTool.certificateList,
              stateUpdated: true,
              showPopupList: true,
              buttonType: 'CHANGE'
            })
          } else {
            if (currentTypesOfCriterion || currentTypesOfCertificate) {
              console.log('aaa')
              this.setState({
                criterionList: currentTypesOfCriterion,
                certificateList: currentTypesOfCertificate,
                stateUpdated: true
              })
            }
        }
      }
    }
  }

  componentDidMount() {
    



    // if (this.props.currentTool) {
      
    
    //   const currentTool = this.props.currentTool
    //   console.log(currentTool)
    //   if (this.props.project) {
    //     const currentTypesOfCriterion = this.props.project.criterions
    //     const currentTypesOfCertificate = this.props.project.certificates


    //     if ((this.state.stateUpdated === false) && (currentTool || currentTypesOfCriterion || currentTypesOfCertificate)) {


    //       if (currentTool) {
          
    //         this.setState({
    //           ...currentTool,
    //           criterionList: currentTool.criterionList,
    //           certificateList: currentTool.certificateList,
    //           stateUpdated: true,
    //           showPopupList: true,
    //           buttonType: 'CHANGE'
    //         })
    //       } else {
    //         if (currentTypesOfCriterion || currentTypesOfCertificate) {

    //           this.setState({
    //             criterionList: currentTypesOfCriterion,
    //             certificateList: currentTypesOfCertificate,
    //             stateUpdated: true
    //           })
    //         }
    //       }
    //     }
    //   }
    // }
  }


  

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  addCriterion = (e) => {
    e.preventDefault();
    this.setState({
      showPopupCriterions : true
    })
  }

  addCertificate = (e) => {
    e.preventDefault();
    this.setState({
      showPopupCertificates: true
    })
  }
  
  closePopup = () => {
    this.setState({
      showPopupCriterions: false,
      showPopupCertificates: false
    })
  }

  deleteItem = (item, itemType) => {

    this.returnItemToState(item, itemType)
    this.props.deleteItem(item, item.itselfKey, itemType)
  }

  returnItemToState = (item, itemType) => {
    const itemTypeWithoutS = itemType.slice(0, -1)
    const propsItems = this.props.project[itemType]
    const currentItemIndex = this.getIndexOfItem(this.props.project[itemType], itemTypeWithoutS, item.typeOfItemId)
    
    let items = this.state[itemTypeWithoutS + 'List']
    items.push(propsItems[currentItemIndex])
    this.setState({
      [itemTypeWithoutS + 'List']: items
    })
  }

  deleteItemFromState = (itemId, itemType) => {
    const itemTypeWithoutS = itemType.slice(0, -1)
    const currentItemIndex = this.getIndexOfItem(this.state[itemTypeWithoutS + 'List'], itemTypeWithoutS, itemId)
    let newItems = []
    newItems = newItems.concat(this.state[itemTypeWithoutS + 'List'])
    newItems.splice(currentItemIndex, 1);

    this.setState({
      [itemTypeWithoutS + 'List']: [...newItems]
    })
    this.changeItemOfTool(newItems, (itemTypeWithoutS + 'List'))
  }

  getIndexOfItem = (items, itemType, currentId) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i][itemType + 'Id'] == currentId)
        return i
    }
  }

  saveTool = () => {
    this.setState({
      // showPopupList: true,
      // buttonType:'CLOSE'
    })
    const dataToSave = this.state
    console.log(dataToSave)
    delete dataToSave.showPopupCriterions
    delete dataToSave.showPopupCertificates
    delete dataToSave.showPopupList
    delete dataToSave.stateUpdated
    delete dataToSave.buttonType
    const itemType = 'securityTools'
    this.props.createTool(dataToSave, itemType, this)
  }

  doneAction = (e) => {
    e.preventDefault()
    this.props.history.push('/toolType/' +this.props.match.params.toolTypeId+'/'+this.state.toolTypeId);
  }

  changeTool = () => {

    const dataToSave = this.state
    delete dataToSave.showPopupCriterions
    delete dataToSave.showPopupCertificates
    delete dataToSave.showPopupList
    delete dataToSave.stateUpdated
    delete dataToSave.buttonType
    const itemType = 'securityTools'
    this.props.history.push('/toolType/' + this.props.match.params.toolTypeId + '/' + this.state.toolTypeId);
    this.props.updateTool(dataToSave, itemType, this.state.toolId)
    
  }

  changeItemOfTool = (items,propertyName) => {
    
    this.setState({
      showPopupList: true,
      buttonType: 'CLOSE'
    })
  
    const dataToSave = this.state
    delete dataToSave.showPopupCriterions
    delete dataToSave.showPopupCertificates
    delete dataToSave.showPopupList
    delete dataToSave.stateUpdated
    delete dataToSave.buttonType
    const itemType = 'securityTools'
    this.props.setProperty(dataToSave,items, itemType, propertyName, this.state.toolId)
    // this.props.history.push('/AddSecurityTool/' + this.props.match.params.toolTypeId + '/' + this.state.toolId  + '/');
  }
  

  render() {

    





    const projectType = this.props.project
    const criterionsOfCurrentType = this.props.criterions
    const certificatesOfCurrentType = this.props.certificates
    let criterionsOfCurrentTool = []
    criterionsOfCurrentType.map(criterion => {
      if (criterion.toolId == this.state.toolId) {
        criterionsOfCurrentTool.push(criterion)
      }
    })
      
    let certificatesOfCurrentTool = []
    certificatesOfCurrentType.map(certificate => {
      if (certificate.toolId == this.state.toolId) {
        certificatesOfCurrentTool.push(certificate)
        }
      })
    if (projectType) {
      return (

        <div className='container section project-ditails'>
          <div className='card z-deph-0'>
            <div className='card-content'>
              <div className='card-action lighten-4'>
                {<span className='card-title'>Добавление  СЗИ типа {projectType.title}</span>}
              </div>
              <div className='input-field'>
                <label className='active' htmlFor='toolTitle'>Название</label>
                <input type='text' id="toolTitle" onChange={this.handleChange} value={this.state.toolTitle} />
              </div>

              <div className='input-field'>
                <label className='active' htmlFor='toolDescription'>Описание и характеристики</label>
                <textarea id='toolDescription' onChange={this.handleChange} className='materialize-textarea ' value={this.state.toolDescription}></textarea>
              </div>

              <div className='input-field'>
                <ToggleButtonTool
                  buttonType={this.state.buttonType}
                  saveToolAction={this.saveTool}
                  changeToolAction={this.changeTool}
                  doneAction={this.changeTool} ></ToggleButtonTool>
              </div>
              {
                this.state.showPopupList && 
                  <div className='card z-deph-0'>
                <div className='card-action lighten-4'>
                    <ToolCriterionList titleLeft={'Критерии'} titleRight={'численное значение'} itemList={criterionsOfCurrentTool} itemType={'criterions'} deleteAction={this.deleteItem} ></ToolCriterionList>

                  {
                    this.state.showPopupCriterions && <AddToolInputField
                      itemType={'criterions'}
                      closePopup={this.closePopup}
                        items={this.state.criterionList}
                      toolTypeId={this.props.match.params.toolTypeId}
                      toolId={this.state.toolId}
                        createItem={this.props.createItem}
                        deleteItemFromState={this.deleteItemFromState}
                        changeItemOfTool={this.changeItemOfTool}
                    />

                  }
                    {!!this.state.criterionList.length &&
                      <a className="btn-floating btn-small waves-effect waves-light green" onClick={this.addCriterion}><i className="material-icons">add</i></a>
                  }
                  
                </div>

                <div className='card-action lighten-4'>
                    <ToolCriterionList titleLeft={'Сертификат'} titleRight={'численное значение'} itemList={certificatesOfCurrentTool} itemType={'certificates'} deleteAction={this.deleteItem} ></ToolCriterionList>

                  {
                    this.state.showPopupCertificates && <AddToolInputField
                        itemType={'certificates'}
                        closePopup={this.closePopup}
                        items={this.state.certificateList}
                        toolId={this.state.toolId}
                        toolTypeId={this.props.match.params.toolTypeId}
                        createItem={this.props.createItem}
                        deleteItemFromState={this.deleteItemFromState}
                        changeItemOfTool={this.changeItemOfTool}
                    />

                    }
                    {!!this.state.certificateList.length &&
                      <a className="btn-floating btn-small waves-effect waves-light green" onClick={this.addCertificate}><i className="material-icons">add</i></a>
                    }
                </div>
              </div>
                
              }
              
              

              
              
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className='container center'>
          <p>Загружаем Тип СЗИ...</p>
        </div>
      )
    }
  }


}

const mapStateToProps = (state, ownProps) => {
  const isEmpty = (obj) => {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  const toolTypeId = ownProps.match.params.toolTypeId
  const toolId = ownProps.match.params.toolId
  const data = state.firestore.data
  if (state.firestore.data.projects) {
  }

  const projects = data.projects
  const project = projects ? projects[toolTypeId] : null;
  const allCriterions = data.criterions
  let filteredCriterions = []

  if (!isEmpty(allCriterions)) {

    for (let criterionKey in allCriterions) {
      if (!(allCriterions[criterionKey] === null)) {
        if (allCriterions[criterionKey].toolTypeId == toolTypeId) {
          allCriterions[criterionKey].itselfKey = criterionKey;
          filteredCriterions.push(allCriterions[criterionKey])
        }
      }
    }
  }

  const allCertificates = data.certificates
  let filteredCertificates = []
  if (!isEmpty(allCertificates)) {
    for (let certificateKey in allCertificates) {
      if (!(allCertificates[certificateKey] === null)) {
        if (allCertificates[certificateKey].toolTypeId == toolTypeId) {
          allCertificates[certificateKey].itselfKey = certificateKey;
          filteredCertificates.push(allCertificates[certificateKey])
        }
      }
    }
  }
  let currentTool = null
  const allSecurityTools = data.securityTools
  if (toolId && !isEmpty(allSecurityTools)) {
    for (let toolKey in allSecurityTools) {
      if (allSecurityTools[toolKey]) {
        if (allSecurityTools[toolKey].toolId == toolId)
          currentTool = allSecurityTools[toolKey]
        }
      }
    }
  return {
    project: project,
    criterions: filteredCriterions,
    certificates:filteredCertificates,
    auth: state.firebase.auth,
    currentTool
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createItem: (tool, itemType) => dispatch(createItem(tool, itemType)),
    createTool: (tool, itemType, thisOfComponent) =>
      dispatch(createTool(tool, itemType, thisOfComponent)),
    updateTool: (tool, itemType, itemId) =>
      dispatch(updateTool(tool, itemType, itemId)),
    updateItem: (tool) => dispatch(updateItem(tool)),
    deleteItem: (tool, itemKey, itemType) => dispatch(deleteItem(tool, itemKey, itemType)),
    setProperty: (item, items, itemType, propertyName, itemId) => dispatch(setProperty(item, items, itemType, propertyName, itemId))
  }
}


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    { collection: 'criterions', orderBy: [] },
    { collection: 'certificates', orderBy: [] },
    //{ collection: 'securityTools', orderBy: ['createdAt', 'desc']}
  ])
)(AddSecurityTool)



// service cloud.firestore {
//   match / databases / { database } / documents {
//     match / projects / { project } {
//       allow read, write: if request.auth.uid != null
//     }
//     match / criterions / { criterion } {
//       allow read, write: if request.auth.uid != null
//     }
//     match / certificates / { certificate } {
//       allow read, write: if request.auth.uid != null
//     }
//     match / securityTools / { securityTool } {
//       allow read, write: if request.auth.uid != null
//     }
//     match / securitySystems / { securitySystem } {
//       allow read, write: if request.auth.uid != null
//     }
//     match / counterId / { counterId } {
//       allow read, write: if request.auth.uid != null
//     }
//     match / users / { userId } {
//       allow create
//       allow read: if request.auth.uid != null
//     	allow write: if request.auth.uid == userId
//     }
//     match / notifications / { notification } {
//       allow read: if request.auth.uid != null

//     }
//   }
// }
