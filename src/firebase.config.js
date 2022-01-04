import firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDqZG2XoRIJ6xMhPbM4wgH-CQplLJl3zWM",
    authDomain: "setflix-prime.firebaseapp.com",
    projectId: "setflix-prime",
    storageBucket: "setflix-prime.appspot.com",
    messagingSenderId: "196512286426",
    appId: "1:196512286426:web:a5cefcf7314f52002ac7e3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export default db;
export { auth };