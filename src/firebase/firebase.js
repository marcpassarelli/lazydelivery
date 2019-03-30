import firebase from 'firebase'

const configProd = {
  apiKey: "AIzaSyDEg_vdMB9UiCpBv2mVnksveSI___aNP5I",
  authDomain: "deliveryaltamira.firebaseapp.com",
  databaseURL: "https://deliveryaltamira.firebaseio.com",
  projectId: "deliveryaltamira",
  storageBucket: "deliveryaltamira.appspot.com",
  messagingSenderId: "752201168315"
}

const configDev = {
  apiKey: "AIzaSyCMzXGGIwSY2MQRstUN3ufezu33NXUA1nA",
  authDomain: "deliveryaltamira-restore.firebaseapp.com",
  databaseURL: "https://deliveryaltamira-restore.firebaseio.com",
  projectId: "deliveryaltamira-restore",
  storageBucket: "deliveryaltamira-restore.appspot.com",
  messagingSenderId: "308469361421"
}

export const firebaseImpl = firebase.initializeApp(configProd)
export const db = firebase.database()
export const auth = firebase.auth()
export const storage = firebase.storage()
