export const createItem = (item, itemType) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
      firestore.collection(itemType).add({
        ...item,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        autorId: authorId,
        createdAt: new Date()

      }).then(() => {
        dispatch({ type: 'CREATE_' + itemType.toUpperCase(), item, itemType });
      }).catch((err) => {
        dispatch({ type: 'CREATE_' + itemType.toUpperCase() + '_ERROR', err, itemType });
      })
    


    
  }
};

export const createTool = (item, itemType, thisOfComponent) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection(itemType).add({
      ...item,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      autorId: authorId,
      createdAt: new Date()

    }).then((docRef) => {
        thisOfComponent.setState({
          toolId: docRef.id
      })
      firestore.collection(itemType).doc(docRef.id).set({
        toolId: docRef.id
      }, { merge: true });
      }).then(() => {
        dispatch({ type: 'CREATE_' + itemType.toUpperCase(), item, itemType});
      }).catch((err) => {
        dispatch({ type: 'CREATE_' + itemType.toUpperCase() + '_ERROR', err, itemType });
      })
  }
};

export const updateTool = (item, itemType, itemId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore();
    firestore.update({ collection: itemType, doc: itemId }, item).then(() => {
      dispatch({ type: 'UPDATE_' + itemType.toUpperCase(), item, itemType});
    }).catch((err) => {
      dispatch({ type: 'UPDATE_' + itemType.toUpperCase() + '_ERROR', err, itemType});
    })

  }
};



export const deleteItem = (item, itemKey, itemType) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore.delete({ collection: itemType, doc: itemKey }).then(() => {
      dispatch({ type: 'DELETE_' + itemType.toUpperCase(), item, itemType});
    }).catch((err) => {
      dispatch({ type: 'DELETE_' + itemType.toUpperCase() + '_ERROR', err, itemType });
    })

  }
};

export const updateItem = (item, itemType, props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const itemId = props.match.params.itemId;
    firestore.update({ collection: itemType, doc: itemId }, item).then(() => {
      dispatch({ type: 'UPDATE_' + itemType.toUpperCase(), item, itemType });
    }).catch((err) => {
      dispatch({ type: 'UPDATE_' + itemType.toUpperCase() + '_ERROR', err, itemType });
    })

  }
};

