import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import { deleteProject } from '../../store/actions/projectActions'
import { DetailsItemList } from './DetailsItemList'
import { DetailsToolList } from '../securityTools/DetailsToolList'

const ProjectDetails = (props) => {
  const handleClick = (e) => {
    props.deleteProject(props)
    
  }

  const { project, auth } = props;
  if (!auth.uid) return <Redirect to='/signin' />
  if (project) {
    return (
      <div className='container section project-ditails'>
        <div className='card z-deph-0'>
          <div className='card-content'>
            <span className='card-title'>{ project.title }</span>
            <p>{ project.content }</p>
          </div>
          <div className='card-action gret lighten-4 grey-text'>
            <div>Добавлено следующим пользователем: {project.authorFirstName} {project.authorLastName}</div>
            <div>{moment(project.createdAt.toDate()).calendar()}</div>
            <Link to='/' onClick={handleClick}>Удалить тип СЗИ</Link>
            <Link to={'/updateType/' + props.match.params.id +''} >Изменить тип СЗИ</Link>
          </div>
          <div className='card-content'>
            <div className="card gret lighten-4">
              <div className="row">
                <div className="col s6 m6">
                  
                  <DetailsItemList titleLeft={'Критерий'} titleRight={'Вес'} itemList={project.criterions} itemType={'criterion'} ></DetailsItemList>
                  
                </div>
                <div className="col s6 m6">

                  <DetailsItemList titleLeft={'Сертификат'} titleRight={'Вес'} itemList={project.certificates} itemType={'certificate'} ></DetailsItemList>

                </div>
              </div>
            </div>
              
          </div>

          <div className='card-content'>
            <div className="row">
              <div className="col s6 m6">
                <span className='card-title'>Список СЗИ данного типа:</span> 
              </div>
              <div className="col s6 m6">
                <Link to={'/AddSecurityTool/' + props.match.params.id} ><button className='btn pink lighten-1 z-depth-0'>Добавить СЗИ</button></Link>
              </div>
            </div>
            <DetailsToolList toollTypeId={props.match.params.id} items={props.tools}></DetailsToolList>

          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className='container center'>
        <p>Loading project...</p>
      </div>
    )
  }
  
}

const mapStateToProps = (state, ownProps) => {

  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  const allTools = state.firestore.data.securityTools;
  let tools = []
  for (let toolKey in allTools) {
    if (allTools[toolKey].toolTypeId == id) {
      tools.push(allTools[toolKey])
    }
  }
  return {
    project: project,
    auth: state.firebase.auth,
    tools:tools
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (project) => dispatch(deleteProject(project))
  }
}


export default compose(
  firestoreConnect([
    { collection: 'projects' },
    { collection: 'securityTools', orderBy: ['createdAt'] }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
  
)(ProjectDetails)



