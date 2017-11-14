console.ignoredYellowBox = [
    'Setting a timer'
]
import * as firebase from "firebase";

export class Firebase {

    /**
     * Initialises Firebase
     */
    static initialize() {
        firebase.initializeApp({
              apiKey: "AIzaSyDEg_vdMB9UiCpBv2mVnksveSI___aNP5I",
              authDomain: "deliveryaltamira.firebaseapp.com",
              databaseURL: "https://deliveryaltamira.firebaseio.com",
              projectId: "deliveryaltamira",
              storageBucket: "deliveryaltamira.appspot.com",
              messagingSenderId: "752201168315"
        });
    }

}
