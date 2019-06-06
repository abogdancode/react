import { Certificate } from './certificate'
import {Criterion} from './criterion'
export class Tool {

  constructor(toolId, toolTitle, certificates, criterions, currentTypeOfTool, allCertificates, allCriterions) {

    this.toolId = toolId
    this.toolTitle = toolTitle

    let weightSum = 0
    let weightNormalizedSum = 0

    currentTypeOfTool.criterions.map((item) => {
      weightSum += Math.abs(Number(item.criterionWeight))
    })

    currentTypeOfTool.certificates.map((item) => {
      weightSum += Math.abs(Number(item.certificateWeight))
    })


    currentTypeOfTool.criterions.map((item) => {
        item.normalizedWeight = Number(item.criterionWeight) / weightSum
    })
    currentTypeOfTool.certificates.map((item) => {
      item.normalizedWeight = Number(item.certificateWeight) / weightSum
    })

    this.toolCriterions = this.fillCriterions(criterions, currentTypeOfTool, allCriterions)
    this.toolCertificates = this.fillCertificates(certificates, currentTypeOfTool, allCertificates)
    this.qualityLevel = this.getQualityLevel(this.toolCertificates, this.toolCriterions)

  }

  fillCriterions(criterions, currentTypeOfTool, allCriterions) {
    let filteredCriterions = []
    let verificatedValue = ''
    let valuesArr = []

    criterions.map((criterion) => {

      let arrOfValuesOfCurrentCriterionType = []
      allCriterions.map((criterionOfCurrentToolType) => {
        if (criterionOfCurrentToolType.typeOfItemId == criterion.typeOfItemId) {
          arrOfValuesOfCurrentCriterionType.push(criterionOfCurrentToolType.itemValue)
        }
      })


      let calculateMaxValue = Math.max.apply(null, arrOfValuesOfCurrentCriterionType);
      let calculateMinValue = Math.min.apply(null, arrOfValuesOfCurrentCriterionType);


      const itemValue = criterion.itemValue
      const currentId = criterion.typeOfItemId
      const allCriterioneTypes = currentTypeOfTool.criterions
      const indexOfItem = this.getIndexOfItem(allCriterioneTypes, 'criterion', currentId)
      const currentMaxValue = Number(currentTypeOfTool.criterions[indexOfItem].maxValue)
      const currentMinValue = Number(currentTypeOfTool.criterions[indexOfItem].minValue)
      const currentCommonWeight = Number(currentTypeOfTool.criterions[indexOfItem].normalizedWeight)
      const currentWeight = Number(currentTypeOfTool.criterions[indexOfItem].normalizedWeight)
      

      if (currentMaxValue == currentMinValue && Number(currentMaxValue) !== 0) {
        if (currentWeight >= 0) {
          verificatedValue = (itemValue - calculateMinValue) / (calculateMaxValue - calculateMinValue)
        } else {
          verificatedValue = (calculateMaxValue - itemValue) / (calculateMaxValue - calculateMinValue)
        }

      } else {
        
        if (currentMaxValue == currentMinValue && currentMaxValue == 0) {
          if (currentWeight >= 0) {
            verificatedValue = (itemValue - 0) / (calculateMaxValue - 0)
          } else {
            verificatedValue = (calculateMaxValue - itemValue) / (calculateMaxValue - 0)
          }

        } else {
          if (itemValue <= currentMinValue) {
            if (currentWeight >= 0)
              verificatedValue = 0
            else
              verificatedValue = 1
          } else {
            if (itemValue >= currentMaxValue) {
              if (currentWeight >= 0)
                verificatedValue = 1
              else
                verificatedValue = 0
            } else {
              
              if (currentWeight >= 0)
                verificatedValue = (itemValue - currentMinValue) / (currentMaxValue - currentMinValue)
              else
                verificatedValue = (currentMaxValue - itemValue) / (currentMaxValue - currentMinValue)
            }
          }
        }
      }
      filteredCriterions.push(new Criterion(criterion.itemTitle, itemValue, verificatedValue, currentWeight, currentCommonWeight, criterion.typeOfItemId, criterion.itselfKey))

    })
    return filteredCriterions
  }

  fillCertificates(certificates, currentTypeOfTool, allCertificates) {
    let filteredCertificates = []
    let verificatedValue = ''
    let valuesArr = []

    certificates.map((certificate) => {
      let arrOfValuesOfCurrentCertificateType = []
      allCertificates.map((certificateOfCurrentToolType) => {
        if (certificateOfCurrentToolType.typeOfItemId == certificate.typeOfItemId) {
          arrOfValuesOfCurrentCertificateType.push(certificateOfCurrentToolType.itemValue)
        }
      })


      let calculateMaxValue = Math.max.apply(null, arrOfValuesOfCurrentCertificateType);
      let calculateMinValue = Math.min.apply(null, arrOfValuesOfCurrentCertificateType);


      const itemValue = certificate.itemValue
      const currentId = certificate.typeOfItemId
      const allCertificateTypes = currentTypeOfTool.certificates
      const indexOfItem = this.getIndexOfItem(allCertificateTypes, 'certificate', currentId)
      const currentMaxValue = currentTypeOfTool.certificates[indexOfItem].maxValue
      const currentMinValue = currentTypeOfTool.certificates[indexOfItem].minValue
      const currentCommonWeight = currentTypeOfTool.certificates[indexOfItem].cerificateWeight
      const currentWeight = currentTypeOfTool.certificates[indexOfItem].normalizedWeight

      if (currentMaxValue == currentMinValue && Number(currentMaxValue) !== 0) {
        if (currentWeight >= 0) {
          verificatedValue = (itemValue - calculateMinValue) / (calculateMaxValue - calculateMinValue)
        } else {
          verificatedValue = (calculateMaxValue - itemValue) / (calculateMaxValue - calculateMinValue)
        }

      } else {

        if (currentMaxValue == currentMinValue && currentMaxValue == 0) {
          if (currentWeight >= 0) {
            verificatedValue = (itemValue - 0) / (calculateMaxValue - 0)
          } else {
            verificatedValue = (calculateMaxValue - itemValue) / (calculateMaxValue - 0)
          }

        } else {
          if (itemValue <= currentMinValue) {
            if (currentWeight >= 0)
              verificatedValue = 0
            else
              verificatedValue = 1
          } else {
            if (itemValue >= currentMaxValue) {
              if (currentWeight >= 0)
                verificatedValue = 1
              else
                verificatedValue = 0
            } else {

              if (currentWeight >= 0)
                verificatedValue = (itemValue - currentMinValue) / (currentMaxValue - currentMinValue)
              else
                verificatedValue = (currentMaxValue - itemValue) / (currentMaxValue - currentMinValue)
            }
          }
        }
      }
      filteredCertificates.push(new Certificate(certificate.itemTitle, itemValue, verificatedValue, currentWeight, currentCommonWeight, certificate.typeOfItemId, certificate.itselfKey))

    })
    return filteredCertificates
  }


  getQualityLevel(toolCertificates, toolCriterions) {
    const concatedArr = toolCertificates.concat(toolCriterions)
    let qualityLevel=0
    concatedArr.map((item) => {
      qualityLevel += Math.abs(item.verificatedValue*item.weight)
    })
    return qualityLevel
  }


  getIndexOfItem(items,itemType, currentId) {
    for (let i = 0; i < items.length; i++){
      if (items[i][itemType + 'Id'] == currentId)
        return i
    }
  }

  round(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }
}
