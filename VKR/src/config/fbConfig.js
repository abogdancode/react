import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyCcb30R3QxMLrv8_cXoqkHID4LfV_Hm9A8",
  authDomain: "vkrstudy.firebaseapp.com",
  databaseURL: "https://vkrstudy.firebaseio.com",
  projectId: "vkrstudy",
  storageBucket: "vkrstudy.appspot.com",
  messagingSenderId: "246703468550"
};
firebase.initializeApp(config);
firebase.firestore().settings({});

export default firebase 
