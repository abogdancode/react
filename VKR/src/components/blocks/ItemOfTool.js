import React from 'react'
import { Link } from 'react-router-dom'

export const ItemOfTool = ({ item, itemType }) => {
  return (
    <ul className="collection">
            <li className="row collection-item">
              <div className="card-content col s9 m9 ">
                {item[itemType + 'Title']}
              </div>
              <div className="card-content col s3 m3">
                {item[itemType + 'Weight']}
              </div>
            </li>
    </ul>
  )
}

