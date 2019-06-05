import React from 'react'
import { Link } from 'react-router-dom'



const InputField = (props) => {
  return (
    <div className='input-field row'>
      <div className='col s6'>
        <label htmlFor={'c' + props.id}>{props.placeholder}</label>
        <textarea id={'c' + props.id} onChange={props.onChange} className='materialize-textarea active' value={props.title} ></textarea>
      </div>
      <div className='col s4'>
        <label htmlFor={'w' + props.id}>весовой коэффициент </label>
        <textarea id={'w' + props.id} onChange={props.onWeightChange} className='materialize-textarea active' value={props.itemWeight} ></textarea>
      </div>
      <div className='col s1'>

        <a className="btn-floating btn-small waves-effect waves-light gray" onClick={props.handleSettings}><i id={'s' + props.id} className="material-icons ">settings</i></a>

        
      </div>
      <div className='col s1'>
        <a onClick={props.remove} className="btn-floating  btn-small waves-effect waves-light red"><i id={'r' + props.id} className="material-icons">remove</i></a>
      </div>
    </div>
  )
}

export default InputField
