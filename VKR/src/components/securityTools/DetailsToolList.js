import React from 'react'
import { Link } from 'react-router-dom'
import { ItemOfTool } from '../blocks/ItemOfTool'


export const DetailsToolList = ({ items, toollTypeId }) => {
  return (

    <div className='card z-deph-0'>
      <div className="collection">
        <div className="row">
          <div className="col s6 m6">
            <span className='card-title'>Наименование</span> 
          </div>
          <div className="col s6 m6">
            <span className='card-title'>Характеристики</span> 
          </div>
        </div>
        
        
        {items && items.map(item => {
          return (
            <Link to={'/AddSecurityTool/' + toollTypeId + '/' + item.toolId} >
              <a href="#!" className="collection-item">
                <div className="row">
                  <div className="col s6 m6">
                    <span className='card-title'>{item.toolTitle}</span>
                  </div>
                  <div className="col s6 m6">
                    <span className='card-title'>{item.toolDescription}</span>
                  </div>
                </div>
              </a>
            </Link>
          )
        })}
      
      </div>
    </div>
        
          
        

  )
}

