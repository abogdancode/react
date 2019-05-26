import React, { Component } from 'react'

class CertificateSettings extends Component {
  state = {
    certificateMinValue: 0,
    certificateMaxValue: 1,
    certificateComment:''
  }
  
  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onDoneClick = (e) => {
    e.preventDefault();
    this.props.onDone(this.state)
  }

  render() {
  
    const projectState = this.props.projectState
    const currentCertificate = projectState.currentCertificate

    return (
      <div className=' popup container section project-ditails'>
        <div className='card z-deph-1'>
          <div className='card-content'>
            <span className='card-title'>Настройки сертификата {currentCertificate.certificateTitle} в СЗИ {projectState.title}</span>
            <p>{projectState.content}</p>
          </div>

          <div className='card z-deph-2'>
            <div className='card-content'>
              <div className='input-field row'>
                <div className='col s6'>
                  <label htmlFor={'certificateMinValue'}>Минимальное численное значение</label>

                </div>
                <div className='col s6'>
                  <textarea id={'certificateMinValue'} onChange={this.onChange} className='materialize-textarea ' value={this.state.certificateMinValue} ></textarea>
                </div>
              </div>

              <div className='input-field row'>

                <div className='col s6'>
                  <label htmlFor={'certificateMaxValue'}>Максимальное численное значение</label>
                </div>

                <div className='col s6'>
                  <textarea id={'certificateMaxValue'} onChange={this.onChange} className='materialize-textarea ' value={this.state.certificateMaxValue} ></textarea>
                </div>

              </div>
            </div>
          </div>
          <div className='card z-deph-2'>
            <div className='card-content'>
              <div className='input-field'>

                <label htmlFor={'certificateComment'}>Комментарий</label>
                <textarea id={'certificateComment'} onChange={this.onChange} className='materialize-textarea ' value={this.state.certificateComment} ></textarea>

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

export default CertificateSettings



