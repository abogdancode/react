import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  render() {
    
    const { projects, auth, notifications } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="dashboard container">
        <div className='container'>
          <Link className='translatedHor' to={'/create/' + this.props.match.params.systemId} >
            <button className=' btn green btn-large lighten-1 z-depth-0'>Добавить тип СЗИ</button>
          </Link>
        </div>
        
        <div className="row">
          <div className="col s12 m6">
            
            
            
            <ProjectList projects={projects} type={"toolType"} />
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications notifications={notifications}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const isEmpty = (obj) => {
    for (let key in obj) {
      return false;
    }
    return true;
  }

  const id = ownProps.match.params.systemId;
  const allProjects = state.firestore.data.projects;
  let filteredProjects = []
  if (!isEmpty(allProjects)) {
    for (let projectKey in allProjects) {
      if (!(allProjects[projectKey] === null)) {
        if (allProjects[projectKey].systemId == id) {
          filteredProjects.push(allProjects[projectKey])
        }
      }
    }
  }
  return {
    projects: filteredProjects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] },
    
  ])
)(Dashboard)
