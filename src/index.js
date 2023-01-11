import './styles/main.css';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

/*  **************************************************************************************************

//  => Client Side rendered App: React (cra);
//  ==> Database Which is Firebase
//  ====> React-Loading-Skeleton
//  =====> Tailwind

*************************************** Architecture ***********************************************

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

************************************************************************************************* */
