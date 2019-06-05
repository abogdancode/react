import React, { Component } from 'react'

class CriterionSettings extends Component {
  state = {
    criterionMinValue: this.props.projectState.currentCriterion.minValue,
    criterionMaxValue: this.props.projectState.currentCriterion.maxValue,
    criterionComment: this.props.projectState.currentCriterion.description
  }
  
  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value.replace(",", ".")
    })
  }

  onDoneClick = (e) => {
    e.preventDefault();
    this.props.onDone(this.state)
  }

  render() {
  
    const projectState = this.props.projectState
    const currentCriterion = projectState.currentCriterion

    let descRowCountPercents = 1
    if (this.state.criterionComment) {
      descRowCountPercents = Number(2 * this.state.criterionComment.lineCount()) + 'em'
    } 
    return (
      <div className=' popup container section project-ditails'>
        <div className='card z-deph-1'>
          <div className='card-content'>
            <span className='card-title'>Настройки критерия ({currentCriterion.criterionTitle}) в СЗИ {projectState.title}</span>
            <p>{projectState.content}</p>
          </div>

          <div className='card z-deph-2'>
            <div className='card-content'>
              <div className='input-field row'>
                <div className='col s6'>
                  <label className='active' htmlFor={'criterionMinValue'}>Минимальное численное значение</label>

                </div>
                <div className='col s6'>
                  <textarea id={'criterionMinValue'} onChange={this.onChange} className='materialize-textarea active' value={this.state.criterionMinValue} ></textarea>
                </div>
              </div>

              <div className='input-field row'>

                <div className='col s6'>
                  <label className='active' htmlFor={'criterionMaxValue'}>Максимальное численное значение</label>
                </div>

                <div className='col s6'>
                  <textarea  id={'criterionMaxValue'} onChange={this.onChange} className='materialize-textarea active' value={this.state.criterionMaxValue} ></textarea>
                </div>

              </div>
            </div>
          </div>
          <div className='card z-deph-2'>
            <div className='card-content'>
              <div className='input-field'>

                <label className='active' htmlFor={'criterionComment'}>Комментарий</label>
                <textarea style={{
                  height: descRowCountPercents,
                  maxHeight: '230px',
                  overflowY: 'auto'
                }} id={'criterionComment'} onChange={this.onChange} className='materialize-textarea active' value={this.state.criterionComment} ></textarea>

              </div>
            </div>
          </div>

          <div className='card z-deph-2'>
            <div className='card-content'>
              <div className='input-field'>
                <button onClick={this.onDoneClick} className='btn pink lighten-1'>Применить</button>
              </div>
            </div>
          </div>
            
          

        </div>
      </div>
    )
  
  }

  

}

export default CriterionSettings



