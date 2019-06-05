const initState = {
  items: []
}

const itemReducer = (state = initState, action) => {
  let itemType = 'tools'
  if (action.itemType) {
    itemType = action.itemType
  }
  switch (action.type) {
    case ('CREATE_' + itemType.toUpperCase()):
      console.log('created ' + itemType.toUpperCase(), action.item);
      return state;
    case 'CREATE_' + itemType.toUpperCase()+'_ERROR':
      console.log('create ' + itemType.toUpperCase() + ' error', action.err)
      alert('Отказано в доступе!!!')
      return state;
    case 'DELETE_' + itemType.toUpperCase() +'':
      console.log('deleted ' + itemType.toUpperCase() + '', action.item);
      return state;
    case 'DELETE_' + itemType.toUpperCase() +'_ERROR':
      console.log('delete ' + itemType.toUpperCase() + ' error', action.err)
      alert('Отказано в доступе!!!')
      return state;
    case 'UPDATE_' + itemType.toUpperCase() +'':
      console.log('updating ' + itemType.toUpperCase() + '', action.item);
      return state;
    case 'UPDATE_' + itemType.toUpperCase() +'_ERROR':
      console.log('update ' + itemType.toUpperCase() + ' error', action.err)
      alert('Отказано в доступе!!!')
      return state;
    default:
      return state;
  }
}

export default itemReducer
