export const createProject = (project, thisOfComponent) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      autorId: authorId,
      createdAt: new Date()
    })
      .then((docRef) => {
        thisOfComponent.setState({
          id: docRef.id
        })
        firestore.collection('projects').doc(docRef.id).set({
          id: docRef.id
        }, { merge: true }).then((docRef) => {
          thisOfComponent.props.history.push('/toolTypeDashboard/' + thisOfComponent.state.systemId);
        })
      })
      .then(() => {
      dispatch({ type: 'CREATE_PROJECT', project });
    }).catch((err) => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', err });
    })
    
  }
};

export const deleteProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const projectId = project.match.params.id;
    
    firestore.delete({ collection: 'projects', doc: projectId }).then(() => {
      dispatch({ type: 'DELETE_PROJECT', project });
    }).catch((err) => {
      dispatch({ type: 'DELETE_PROJECT_ERROR', err });
    })

  }
};

export const updateProject = (project, props) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    const projectId = props.match.params.id;
    firestore.update({ collection: 'projects', doc: projectId }, project).then(() => {
      dispatch({ type: 'UPDATE_PROJECT', project });
    }).catch((err) => {
      dispatch({ type: 'UPDATE_PROJECT_ERROR', err });
    })

  }
};

