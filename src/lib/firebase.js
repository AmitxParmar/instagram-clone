import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

/*  import { seedDatabase } from '../seed';*/
// Here I want to import the seed file

const config = {
    apiKey: "AIzaSyCSp7O6sOSPupUf4QdRj2Jge8racS4E9SY",
    authDomain: "instagram-clone-94434.firebaseapp.com",
    projectId: "instagram-clone-94434",
    storageBucket: "instagram-clone-94434.appspot.com",
    messagingSenderId: '441885107855',
    appId: "1:441885107855:web:0dd22114d71932989d32fa"
};

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const { FieldValue } = db;

// Here is where I want to call the seed file (only ONCE!)

//seedDatabase(firebase);
export { firebaseApp, db, auth, FieldValue };