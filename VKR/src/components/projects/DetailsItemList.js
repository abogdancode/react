import React from 'react'
import { Link } from 'react-router-dom'
import { ItemOfTool } from '../blocks/ItemOfTool'


export const DetailsItemList = ({ titleLeft, titleRight, itemList, itemType }) => {
  return (
    <div className='project-list section'>

      <div className="card-content ">
        <div className="row collection-item">
          <div className="card-content col s9 m9 ">
            <span className="card-title">{titleLeft}</span>
          </div>
          <div className="card-content col s3 m3">
            <span className="card-title">{titleRight}</span>
          </div>
        </div>
        {
          itemList && itemList.map(item => {
            return (
              <ItemOfTool item={item} itemType={itemType} key={'details' + itemType + item[itemType + 'Id']} ></ItemOfTool>
              )
            })
        }
        
        

      </div>

    </div>

  )
}

