import { initializeApp } from 'firebase/app';
import { getFirestore, addDoc, collection, where, setDoc, doc } from "firebase/firestore";
import { getAuth, updateProfile, createUserWithEmailAndPassword, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
/* require('os')
import ENV from "dotenv"
ENV.config();
//resolve.fallback: { "os": false }
*/
//import seedDatabase from './seed';
// Here I want to import the seed file

const firebaseConfig = {
    apiKey: "AIzaSyCSp7O6sOSPupUf4QdRj2Jge8racS4E9SY",
    authDomain: "instagram-clone-94434.firebaseapp.com",
    projectId: "instagram-clone-94434",
    storageBucket: "instagram-clone-94434.appspot.com",
    messagingSenderId: "441885107855",
    appId: "1:441885107855:web:0dd22114d71932989d32fa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const { FieldValue } = db;
const provider = new GoogleAuthProvider();

// Here is where I want to call the seed file (only ONCE!)
//seedDatabase(db); //seeding done

export { app, db, auth, FieldValue, collection, doc, addDoc, where, getFirestore, setDoc, updateProfile, createUserWithEmailAndPassword, GoogleAuthProvider, provider, signOut, onAuthStateChanged };