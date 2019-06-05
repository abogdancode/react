import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

class SystemDashboard extends Component {
  render() {

    const { projects, auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' />
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m12">
            <ProjectList projects={projects} type={'toolTypeDashboard'}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    projects: state.firestore.ordered.securitySystems,
    auth: state.firebase.auth,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'securitySystems', orderBy: ['createdAt', 'desc'] },
    
  ])
)(SystemDashboard)
