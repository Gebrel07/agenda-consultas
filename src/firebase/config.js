import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBB2wLIDbsaTZrCwjie7RhWx9tmgtKEQ1c",
  authDomain: "mymoney-45213.firebaseapp.com",
  projectId: "mymoney-45213",
  storageBucket: "mymoney-45213.appspot.com",
  messagingSenderId: "337022875803",
  appId: "1:337022875803:web:d03da16c49166ba5feae3e",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

const timestamp = firebase.firestore.Timestamp;

export { projectAuth, projectFirestore, timestamp };