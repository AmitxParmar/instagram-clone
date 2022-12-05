import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase'
import { firebaseApp, FieldValue } from "./lib/Firebase"
import "./styles/main.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <FirebaseContext.Provider value={{ firebaseApp, FieldValue }}>
        <StrictMode>
            <App />
        </StrictMode>
    </FirebaseContext.Provider>
);

/* const names = [1, [33, 65, [666]], 3, 7, 7, 1];
const unique = new Set(names);
console.log("UNique" + [...unique]); */
/*console.log(names); */

/* const result = names.flatMap(item => item);
console.log(...result); */
/* let newNames = [];
for (let i in names) {
    for (let j in names) {
        if (names[i] === names[j]) {
            newNames.push(names[i]);
            console.log(`duplicate value found: " ${newNames}`);
        }
    }
} */



//*  */**************************************************************************************************

//  => Client Side rendered App: React (cra);
//  ==> Database Which is Firebase
//  ====> React-Loading-Skeleton
//  =====> Tailwind

/**************************************** Architecture *************************************************

===> src <===
// ==> Components
// ==> Constants,
// ==> Context,
// ==> helpers,
// ==> hooks,
// ==> pages,
// ==> lib (Firebase is going to be live here),
// ==> Services (Firebase function in here).
// ==> Styles (Tailwind's folder (App/Tailwind))

**************************************************************************************************/
