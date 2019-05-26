import React from 'react'


export const ToggleButtonTool = ({ buttonType, saveToolAction, changeToolAction, doneAction }) => {
  let buttonText = ''
  let buttonAction = null
  switch (buttonType){
    case 'SAVE':
      buttonText = 'Перейти к настройке'
      buttonAction = saveToolAction
      break;
    case 'CHANGE':
      buttonText = 'Сохранить изменения'
      buttonAction = changeToolAction
      break;
    case 'CLOSE':
      buttonText = 'Применить и закрыть'
      buttonAction = doneAction
      break;
    default:
  }
  return (

    <button onClick={buttonAction} className='btn pink lighten-1 z-depth-0'>{buttonText}</button>

  )
}

