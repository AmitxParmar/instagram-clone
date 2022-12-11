import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

/*  import { seedDatabase } from '../seed';*/
// Here I want to import the seed file

const config = {
    apiKey: ,
    authDomain: ,
    projectId: ,
    storageBucket:,
    messagingSenderId:,
    appId: ,
};

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const { FieldValue } = db;

// Here is where I want to call the seed file (only ONCE!)

//seedDatabase(firebase);
/* export { firebaseApp, db, auth, FieldValue }; */
