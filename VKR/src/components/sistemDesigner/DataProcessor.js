import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Tool } from './tool'
import { ListOfProcesseredTools } from './ListOfProcesseredTools'
import { ListOfToolsNormalized } from './ListOfToolsNormalized'


class DataProcessor extends Component {
  state = {
  }
  render() {

    const typeOfTool = this.props.typeOfTool

    const securityTools = this.props.securityTools
    const certificates = this.props.certificates
    const criterions = this.props.criterions
    let processedTools = []
    if (securityTools && certificates && criterions && typeOfTool) {
      
      securityTools.map((tool) => {
        let filteredCriterions = []
        criterions.map((criterion) => {
          if (criterion.toolId == tool.toolId)
            filteredCriterions.push(criterion)
        })
        let filteredCertificates = []
        certificates.map((certificate) => {
          if (certificate.toolId == tool.toolId)
            filteredCertificates.push(certificate)
        })
        let currentTool = new Tool(tool.toolId, tool.toolTitle, filteredCertificates, filteredCriterions, typeOfTool, certificates, criterions)
        processedTools.push(currentTool)
      })

      processedTools.sort(function (a, b) {
        if (a.qualityLevel > b.qualityLevel) {
          return -1;
        }
        if (a.qualityLevel < b.qualityLevel) {
          return 1;
        }
        return 0;
      });
      for (let i = 0; i < processedTools.length; i++){
        if (processedTools[i + 1]) {
          processedTools[i].advantage = processedTools[i].qualityLevel - processedTools[i + 1].qualityLevel
        } else {
          processedTools[i].advantage=0
        }
      }
      

    }

    if (typeOfTool) {
      return (
        <div className="container">
          <div className='card z-deph-0'>
            <div className='card z-deph-0'>
              <div className='card-content'>
                <h4 className='padding-20'>Отчет о результатах рейтинг-анализа СЗИ типа:{typeOfTool.title} в составе поекта АСЗИ: {this.props.system.title}</h4>
              </div>
            </div>
            <div className='card z-deph-0'>
              <div className='card-content'>
                <h5 className='padding-20'>Нормиронванные уровни качества по данным сертификатов и критериям оценки</h5>
                <ListOfToolsNormalized processedTools={processedTools} typeOfTool={typeOfTool}/>
              </div>
              <div className='card-content'>
                <h5 className='padding-20'>Средства защиты информации типа {typeOfTool.title}, ранжированные по сводному показателю качества</h5>
                <ListOfProcesseredTools processedTools={processedTools} />
              </div>
              
            </div>
            <div className='card z-deph-0'>
              <div className='padding-20'> <h5 className="text-align-center">В результате ранжирования СЗИ выявлено:</h5>
                <h5 className="text-align-center">
                  относительное преимущество оптимального варианта в сравнении с ближайшим аналогом: <div className={"bold"}>{processedTools[0].round((processedTools[0].advantage / processedTools[1].qualityLevel) * 100, 2)}%</div>
                </h5>
                <h5 className="text-align-center">
                  относительное преимущество оптимального варианта в сравнении с худшим аналогом:
                  <div className={"bold"}>
                    {processedTools[0].round(((processedTools[0].qualityLevel - processedTools[processedTools.length - 1].qualityLevel) / processedTools[processedTools.length - 1].qualityLevel) * 100, 2)}%</div>
                </h5>

              </div>
            </div>
            <div className='card z-deph-0'>
              <h5 className='padding-20'>Сравнительная оценка свойств средств защиты информации типа {typeOfTool.title} по выбранной системе критериев оценки качества позволяет рекомендовать к использованию в составе СКЗИ следующее СЗИ:
              <div className={"bold text-align-center"}>{processedTools[0].toolTitle}</div></h5>
            </div>

            
          </div>
        </div>

      )
    } else {
      return (
        <p>loading СЗИ</p>
      )
    }
    
  }
}

const mapStateToProps = (state, ownProps) => {
  const data = state.firestore.data
  const params = ownProps.match.params
  const toolTypeId = params.toolTypeId

  const allSystems = data.securitySystems
  const allTypeOfTools = data.projects
  const allSecurityTools = data.securityTools
  const allCriterions = data.criterions
  const allCertificates = data.certificates
  
  const isEmpty = (obj) => {
    for (let key in obj) {
      return false;
    }
    return true;
  }
  let currentSystem = null;
  let currentTypeOfTool = null;
  let filteredSecurityTools = [];
  let filteredCertificates = []
  let filteredCriterions = []
  if (allSystems && allTypeOfTools && allSecurityTools && allCriterions && allCertificates) {
    currentSystem = allSystems[params.systemId]
    currentTypeOfTool = allTypeOfTools[toolTypeId]

    if (!isEmpty(allSecurityTools)) {
      for (let securityToolKey in allSecurityTools) {
        if (!(allSecurityTools[securityToolKey] === null)) {
          if (allSecurityTools[securityToolKey].toolTypeId == toolTypeId) {
            allSecurityTools[securityToolKey].itselfKey = securityToolKey;
            filteredSecurityTools.push(allSecurityTools[securityToolKey])
          }
        }
      }
    }

    
    if (!isEmpty(allCertificates)) {
      for (let certificateKey in allCertificates) {
        if (!(allCertificates[certificateKey] === null)) {
          if (allCertificates[certificateKey].toolTypeId == toolTypeId) {
            allCertificates[certificateKey].itselfKey = certificateKey;
            filteredCertificates.push(allCertificates[certificateKey])
          }
        }
      }
    }

    
    if (!isEmpty(allCriterions)) {
      for (let criterionKey in allCriterions) {
        if (!(allCriterions[criterionKey] === null)) {
          if (allCriterions[criterionKey].toolTypeId == toolTypeId) {
            allCriterions[criterionKey].itselfKey = criterionKey;
            filteredCriterions.push(allCriterions[criterionKey])
          }
        }
      }
    }

  }


  return {
    system: currentSystem,
    typeOfTool: currentTypeOfTool,
    securityTools: filteredSecurityTools,
    criterions: filteredCriterions,
    certificates: filteredCertificates,

    auth: state.firebase.auth,
  }
}



export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'] },
    { collection: 'criterions', orderBy: ['createdAt', 'desc'] },
    { collection: 'certificates', orderBy: ['createdAt', 'desc'] },
    { collection: 'securityTools', orderBy: ['createdAt', 'desc'] },
    { collection: 'securitySystems', orderBy: ['createdAt', 'desc']},
  ])
)(DataProcessor)
