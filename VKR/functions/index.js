const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const createNotification = (notification => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
})

exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {

    const project = doc.data();
    const notification = {
      content: 'Добавил новоый тип СЗИ',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification)
  })

exports.userJoined = functions.auth.user()
  .onCreate(user => {

    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Зарегистрировался',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);
      })
  })


exports.projectDeleted = functions.firestore
  .document('projects/{projectId}')
  .onDelete(doc => {

    const project = doc.data();
    const notification = {
      content: 'Удалил тип СЗИ',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification)
  })

exports.projectChanged = functions.firestore
  .document('projects/{projectId}')
  .onUpdate((change, context) => {
    const project = change.after.data();
    const notification = {
      content: 'Изменил тип СЗИ',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification)

  });
