import firebase from 'firebase/app';
import 'firebase/auth';


// Your web app's Firebase configuration
const config = {
    apiKey: "AIzaSyCcJIYaJyOKfvZyi64wonXjhZ8rPYuySNI",
    authDomain: "e-commerce-5f491.firebaseapp.com",
    projectId: "e-commerce-5f491",
    storageBucket: "e-commerce-5f491.appspot.com",
    messagingSenderId: "815922246719",
    appId: "1:815922246719:web:e0cbdad34f700eaa03b48a"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(config);
  }
  

  //export
  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
