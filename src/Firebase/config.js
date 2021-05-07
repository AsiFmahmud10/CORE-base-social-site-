import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBnXRHkVSQSLpA2jUSOKTGK43My98yTgrM",
    authDomain: "imageshare-14d80.firebaseapp.com",
    projectId: "imageshare-14d80",
    storageBucket: "imageshare-14d80.appspot.com",
    messagingSenderId: "791319956504",
    appId: "1:791319956504:web:ee036fd37f005c9837076d"
  };

firebase.initializeApp(firebaseConfig);

  const db =firebase.firestore();
  const auth =firebase.auth();
 const timeStamp = firebase.firestore.FieldValue.serverTimestamp; 
 const storage = firebase.storage()

  export { db, auth, timeStamp,storage };
  