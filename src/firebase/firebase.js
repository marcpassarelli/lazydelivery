import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDEg_vdMB9UiCpBv2mVnksveSI___aNP5I",
  authDomain: "deliveryaltamira.firebaseapp.com",
  databaseURL: "https://deliveryaltamira.firebaseio.com",
  projectId: "deliveryaltamira",
  storageBucket: "deliveryaltamira.appspot.com",
  messagingSenderId: "752201168315"
}

export const firebaseImpl = firebase.initializeApp(config)
export const db = firebase.database()
export const auth = firebase.auth()
