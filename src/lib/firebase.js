import firebase from 'firebase/compat/app';
import '@firebase/auth-compat';
import '@firebase/firestore-compat';
/*  import { seedDatabase } from '../seed';*/
// Here I want to import the seed file

const config = {
    apiKey: "AIzaSyCSp7O6sOSPupUf4QdRj2Jge8racS4E9SY",
    authDomain: "instagram-clone-94434.firebaseapp.com",
    projectId: "instagram-clone-94434",
    storageBucket: "instagram-clone-94434.appspot.com",
    messagingSenderId: "441885107855",
    appId: "1:441885107855:web:0dd22114d71932989d32fa"
};

const firebaseApp = firebase.initializeApp(config);
const { FieldValue } = firebase.firestore(firebaseApp);


// Here is where I want to call the seed file (only ONCE!)

//seedDatabase(firebase);
export { firebaseApp, FieldValue };