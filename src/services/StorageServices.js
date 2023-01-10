import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';

import { db, doc, storage, updateDoc } from '../lib/FirebaseConfig';

export async function uploadUserProfile(file, uploaderUID) { // 
    const [progress, setProgress] = (0);
    if (!file) return;
    const storageRef = ref(storage, `/userProfiles/${uploaderUID}`);
    const docRef = doc(db, "users", uploaderUID);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
        const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // Shows upload progress =================================================================
        console.log(prog);
        setProgress(prog);
    }, (err) => console.log('error occurred during uploading: ', err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(url => {
                    console.log(url);
                    updateDoc(docRef, {
                        profilePic: url // Save the profile Pic URL in the database
                    });
                });
        }
    );
    return progress;
};


async function uploadUserPosts(files, userId) {
    const storageRef = ref(storage, `posts/${userId}`);
    console.log(storageRef);
}