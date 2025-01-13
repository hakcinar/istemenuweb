// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAqkanyQpOekxKal7qgu8al_fUaztZ51eI",
    authDomain: "qrmenu-34bbb.firebaseapp.com",
    databaseURL: "https://qrmenu-34bbb-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "qrmenu-34bbb",
    storageBucket: "qrmenu-34bbb.appspot.com",
    messagingSenderId: "176048184207",
    appId: "1:176048184207:web:731fa0b58a8d7c9fd289fa",
    measurementId: "G-2B7YK4NRCX"
};

let app;

// Server-side ve client-side için güvenli başlatma
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

export default app;