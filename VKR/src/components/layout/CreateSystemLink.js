import React from 'react'
import { NavLink } from 'react-router-dom'




const CreateSystemLink = (props) => {
  return (
    <li><NavLink to={'/systemDesigner'}>Добавить АСЗИ</NavLink></li>
  )
}


export default CreateSystemLink
