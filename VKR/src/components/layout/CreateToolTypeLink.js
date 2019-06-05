import React from 'react'
import { NavLink } from 'react-router-dom'



const CreateToolTypeLink = (props) => {
  return (
      <li><NavLink to={'/create'+props.systemId}>Добавить тип СЗИ</NavLink></li>
  )
}


export default CreateToolTypeLink
