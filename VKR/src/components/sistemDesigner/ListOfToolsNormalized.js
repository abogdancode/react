
import React from 'react'
export const ListOfToolsNormalized = ({ typeOfTool, processedTools }) => {
  let criterionsTypeList = typeOfTool.criterions
  let certificatesTypeList = typeOfTool.certificates
  return (
    <div className='overflow-X-Auto'>
      <table className='highlight centered'>
        <thead>
          <tr>
            <th>Наименование СЗИ</th>
            {
              criterionsTypeList.map((item) => {
                return (
                  <th key={'critid'+item.criterionId} title={item.criterionTitle} >{item.criterionTitle.length > 5 ? (item.criterionTitle.substring(0, 5) + '...') : item.criterionTitle}</th>
                )
              }
              )
            }{
              certificatesTypeList.map((item) => {
                return (
                  <th key={'certid' + item.certificateId}>{item.certificateTitle.length > 5 ? (item.certificateTitle.substring(0, 5) + '...') : item.certificateTitle}</th>
                )
              }
              )
            }
          </tr>
        </thead>
        <tbody>
          {processedTools.map((tool) => {
            return (
              <tr key={'LOPT' + tool.toolId}>
                <td>{tool.toolTitle}</td>
                {criterionsTypeList.map((item) => {
                  let currentValue
                  let key
                  tool.toolCriterions.map((toolItem) => {
                    if (item.criterionId == toolItem.id) {
                      currentValue = toolItem.verificatedValue
                      key = toolItem.itselfKey
                    }

                  })
                  return (
                    <td key={'crit' + key}>{tool.round(currentValue,2)}</td>
                  )
                })}

                {certificatesTypeList.map((item) => {
                  let currentValue
                  let key
                  tool.toolCertificates.map((toolItem) => {
                    if (item.certificateId == toolItem.id) {
                      currentValue = toolItem.verificatedValue
                      key = toolItem.itselfKey
                    }
                  })
                  return (
                    <td key={'cert' + key}>{tool.round(currentValue, 2)}</td>
                  )
                })}
                
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    

  )
}
