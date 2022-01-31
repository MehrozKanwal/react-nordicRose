import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDfTAV9a1D2cnr0tleXLXAoouOJGjqpEU4",
  authDomain: "nordicrose-36891.firebaseapp.com",
  projectId: "nordicrose-36891",
  storageBucket: "nordicrose-36891.appspot.com",
  messagingSenderId: "720902642783",
  appId: "1:720902642783:web:93caa3cc90daa441fa0fea"
};

firebase.initializeApp(firebaseConfig)
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()
const timeStamp = firebase.firestore.Timestamp

export{projectFirestore, projectAuth ,projectStorage, timeStamp}