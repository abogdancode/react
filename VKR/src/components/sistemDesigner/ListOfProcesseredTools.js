
import React from 'react'
export const ListOfProcesseredTools = ({ processedTools})=>{

  return (
    <table className='highlight centered'>
      <thead>
        <tr>
          <th>Наименование СЗИ</th>
          <th>Сводный показатель качества</th>
          <th>Преимущесто над ближайшим аналогом</th>
        </tr>
      </thead>
      <tbody>
        {processedTools.map((tool) => {
          console.log(tool)
          return (
            <tr key={'LOPT' + tool.toolId}>
              <td>{tool.toolTitle}</td>
              <td>{tool.round(tool.qualityLevel,2)}</td>
              <td>{tool.round(tool.advantage,2)}</td>
            </tr>
            )
          
      })}
      </tbody>
    </table>

  )
}
