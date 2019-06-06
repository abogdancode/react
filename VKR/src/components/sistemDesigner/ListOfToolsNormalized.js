
import React from 'react'
export const ListOfToolsNormalized = ({ typeOfTool, processedTools }) => {
  let criterionsTypeList = typeOfTool.criterions
  let certificatesTypeList = typeOfTool.certificates
  let concatedList = criterionsTypeList
  concatedList = concatedList.concat(certificatesTypeList)
  let weightSum = 0
  let weightNormalizedSum = 0
  const round = processedTools[0].round
  criterionsTypeList.map((item) => {
    weightSum += Math.abs(Number(item.criterionWeight))
  })
  
  certificatesTypeList.map((item) => {
    weightSum += Math.abs(Number(item.certificateWeight))
  })
  concatedList.map((item) => {
    item.criterionWeight ?
      item.normalizedWeight =Number(item.criterionWeight) / weightSum :
      item.normalizedWeight =Number(item.certificateWeight) / weightSum
    weightNormalizedSum += Math.abs(item.normalizedWeight)
  })
  console.log(round(weightSum,1))
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
                  <th title={item.certificateTitle} key={'certid' + item.certificateId}>{item.certificateTitle.length > 3 ? (item.certificateTitle.substring(0, 3) + '...') : item.certificateTitle}</th>
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
                  let currentCriterionL
                  tool.toolCriterions.map((toolItem) => {
                    if (item.criterionId == toolItem.id) {
                      currentCriterionL = toolItem
                    }

                  })

                  const titleString = 'Установленное числовое значение: ' + currentCriterionL.value + ' \n' + 'комментарий: \n' + item.description 
                  return (
                    <td title={titleString} key={'crit' + currentCriterionL.itselfKey}>{round(currentCriterionL.verificatedValue,2)}</td>
                  )
                })}

                {certificatesTypeList.map((item) => {

                  let currentCertificateL
                  tool.toolCertificates.map((toolItem) => {
                    if (item.certificateId == toolItem.id) {
                      currentCertificateL = toolItem
                    }

                  })
                  const titleString = 'Установленное числовое значение: ' + currentCertificateL.value + ' \n' + 'комментарий: \n' + item.description
                  return (
                    <td title={titleString} key={'crit' + currentCertificateL.itselfKey}>{round(currentCertificateL.verificatedValue, 2)}</td>
                  )
                  
                  
                  // let currentValue
                  // let key
                  // tool.toolCertificates.map((toolItem) => {
                  //   if (item.certificateId == toolItem.id) {
                  //     currentValue = toolItem.verificatedValue
                  //     key = toolItem.itselfKey
                  //   }
                  // })
                  // return (
                  //   <td key={'cert' + key}>{round(currentValue, 2)}</td>
                  // )


                })}
                
              </tr>
            )
          })}
          <tr className='grey lighten-2'>
            <td title={'Весовые коэффициенты'} className='bold'>Весовые коэф.</td>
            {
              concatedList.map((item) => {
                if (item.criterionWeight) {
                  return (<td className='bold' key={'criter' + item.criterionId}>
                    {round(item.criterionWeight, 2)}</td>)
                } else {
                  return (<td className='bold' key={'certif' + item.certificateId}>
                    {round(item.certificateWeight, 2)}</td>)
                }
              })
            }
          </tr>
          <tr title={'Нормированные весовые коэффициенты'} className='grey lighten-2'>
            <td className='bold'>Нормир. вес. коэф.</td>
            {
              concatedList.map((item) => {
                if (item.criterionWeight) {
                  return (<td className='bold' key={'criter' + item.criterionId}>
                    {round(item.normalizedWeight, 2)}</td>)
                } else {
                  return (<td className='bold' key={'certif' + item.certificateId}>
                    {round(item.normalizedWeight, 2)}</td>)
                }
              })
            }
          </tr>
        </tbody>
      </table>
      <h6 className="text-align-center">Контрольная сумма модулей весовых коэффициентов: <span className='bold'>{round(weightNormalizedSum, 1)}</span> </h6>
    </div>
    

  )
}
