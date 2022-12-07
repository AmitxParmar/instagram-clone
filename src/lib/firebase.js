import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
/*  import { seedDatabase } from '../seed';*/
// Here I want to import the seed file

const config = {
    apiKey: process.env.FIREBASE_DB_KEY,
    authDomain: "instagram-clone-94434.firebaseapp.com",
    projectId: "instagram-clone-94434",
    storageBucket: "instagram-clone-94434.appspot.com",
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID
};

const firebaseApp = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore(firebaseApp);


// Here is where I want to call the seed file (only ONCE!)

//seedDatabase(firebase);
export { firebaseApp, FieldValue };