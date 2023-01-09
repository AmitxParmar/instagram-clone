import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { storage } from '../lib/FirebaseConfig';


export const uploadUserProfile = (file, uploaderUid) => { // 
    if (!file) return;
    const storageRef = ref(storage, `/userProfiles/${uploaderUid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
        const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(prog);
    }, (err) => console.log('error occurred during uploading: ', err),
        () => {
            getDownloadURL(uploadTask.snapshot.ref)
                .then(url => console.log(url));
        }
    );
};