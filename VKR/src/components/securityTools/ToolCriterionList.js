import React from 'react'
import { Link } from 'react-router-dom'
import { ItemOfAddingTool } from './ItemOfAddingTool'


export const ToolCriterionList = ({ titleLeft, titleRight, itemList, itemType, deleteAction }) => {
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
        <ul className="collection">
          {
            itemList && itemList.map(item => {
              return (
                <ItemOfAddingTool item={item} deleteAction={deleteAction} itemType={itemType} key={'criterions' + item.itselfKey} ></ItemOfAddingTool>
              )
            })
          }
        </ul>
        



      </div>

    </div>

  )
}

