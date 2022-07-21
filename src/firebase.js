// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCf8C-m8md48m5WsVPMpmSDWeu-VNgJyjE",
    authDomain: "please-reply-e9c3c.firebaseapp.com",
    projectId: "please-reply-e9c3c",
    storageBucket: "please-reply-e9c3c.appspot.com",
    messagingSenderId: "63008816773",
    appId: "1:63008816773:web:44a895012cc1772168b3ec"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase)

export default firebase;