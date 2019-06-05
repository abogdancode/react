import React from 'react'
import { Link } from 'react-router-dom'
import { ItemOfTool } from '../blocks/ItemOfTool'


export const DetailsToolList = ({ items, toollTypeId, deleteItem }) => {
  const currentKey = (elements) => {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].selected)
        return elements[i].getAttribute('itemkey')
    }
  }
  const handleDeleteItem = (e) => {
    const itemKey = e.target.getAttribute('itemkey')
    deleteItem(itemKey)
  }


  
  return (

    <div className='card z-deph-0'>
      <div className="collection">
        <div className="row">
          <div className="col s6 m6">
            <span className='card-title'>Наименование</span> 
          </div>
          <div className="col s6 m6">
            <span className='card-title'>Описание</span> 
          </div>
        </div>
        
        
        {items && items.map(item => {
          return (
            <div key={'DT' + item.toolId}  className="row">
              <div className="col s10 m10">
                <Link className="collection-item" to={'/AddSecurityToolItems/' + toollTypeId + '/' + item.toolId} >
                  <div className="row">
                    <div className="col s6 m6">
                      <span className=''>{item.toolTitle}</span>
                    </div>
                    <div className="col s6 m6">
                      <span className=''>{item.toolDescription}</span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="col s2 m2">
                <a className="btn-floating right btn-small waves-effect waves-light red" onClick={handleDeleteItem}><i itemkey={item.toolId} className="material-icons">delete</i></a>
              </div>
              
            </div>
            
          )
        })}
      
      </div>
    </div>
        
          
        

  )
}

