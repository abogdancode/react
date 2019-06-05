import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import  CreateSystemLink from './CreateSystemLink'
import  CreateToolTypeLink from './CreateToolTypeLink'


const SignedInLinks = (props) => {
  const createLink = props.pathName == '/' ? <CreateSystemLink /> : null;
  return (
    <ul className='right'>
      {createLink}
      <li><a onClick={props.signOut}>Выйти</a></li>
      <li><NavLink to='/' className='btn btn-floating pink lighten-1'>{props.profile.initials}</NavLink></li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks) 
