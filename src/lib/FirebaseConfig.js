import { initializeApp } from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    doc,
    FieldValue,
    getDoc,
    getDocs,
    getFirestore,
    limit,
    onSnapshot,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig =
{
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MSG_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth(app);
const storage = getStorage(app);

export {
    app, db, storage, auth, FieldValue, updateDoc, collection, serverTimestamp, doc, query, addDoc, where, getFirestore, setDoc, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, arrayUnion,
    arrayRemove,
    signOut, onAuthStateChanged, limit, getDocs, getDoc, onSnapshot
};