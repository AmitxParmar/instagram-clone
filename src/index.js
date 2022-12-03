import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import FirebaseContext from './context/firebase'
import {firebase, FieldValue} from "./lib/firebase"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <FirebaseContext.Provider value={{ firebase, FieldValue, }}>
        <StrictMode>
            <App />
        </StrictMode>
    </FirebaseContext.Provider>
);

/**************************************************************************************************

//  => Client Side rendered App: React (cra); 
//  ==> Database Which is Firebase
//  ====> React-Loading-Skeleton
//  =====> Tailwind

****************************************Architecture*************************************************

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
