import React from 'react'
import ProjectSummary from './ProjectSummary'
import { Link } from 'react-router-dom'

const ProjectList = ({ projects, type }) => {
  return (
    <div className='project-list section'>
      {projects && projects.map(project => {
        let systemId =''
        if (project.systemId) {
          systemId = project.systemId +'/'
        }
        
        return (
          <Link to={'/' + type + '/' + systemId+ project.id} key={('' + type + project.id)}>
            <ProjectSummary project={project}  />
          </Link>
        )
        
  })}
    </div>
    

  
    
  )
}

export default ProjectList
