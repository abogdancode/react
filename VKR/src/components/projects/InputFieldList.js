import React from 'react'
import InputField from '../blocks/InputField'

export const InputFieldList = (props) => {
  return (
    <div className='criterions'>
      <h6>{props.title}</h6>

      {props.items && props.items.map(item => {
        const type = props.type
        return (
          <InputField
            placeholder={props.placeholder}
            remove={props.remove}
            onChange={props.onChange}
            onWeightChange={props.onWeightChange}
            handleSettings={props.handleSettings}
            id={item[type + 'Id']}
            key={item[type + 'Id']}
            title={item[type + 'Title']}
            itemWeight={item[type + 'Weight']}
          />
        )

      })}
    </div>




  )
}


