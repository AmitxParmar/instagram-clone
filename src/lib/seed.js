/* import { db } from "./lib/firebase"; */
//import { db, collection, addDoc, setDoc } from "./firebase-config";


// NOTE: replace "userId" with your firebase authentication userId (can be taken from firebase)
/* async function seedDatabase(db) {
    const users = [
        {
            userId: 'ZHuJJT1PNiUXrX71NAQtLjXlf7G2',
            userName: 'amitxparmar',
            fullName: 'Amit Parmar',
            emailAddress: 'amitparmar901@gmail.com',
            following: [],
            followers: ['2', '3'],
            dateCreated: Date.now()
        },
        {
            userId: '2',
            userName: 'Raphel',
            fullName: 'Raffello Sanzio',
            emailAddress: 'raphel@sanzio.com',
            following: ['ZHuJJT1PNiUXrX71NAQtLjXlf7G2'],
            followers: [],
            dateCreated: Date.now()
        },
        {
            userId: '3',
            userName: 'dali',
            fullName: 'Salvador Dali',
            emailAddress: 'salvador@dali.com',
            following: ['ZHuJJT1PNiUXrX71NAQtLjXlf7G2'],
            followers: ['saodmasodmasomdpsmd'],
            dateCreated: Date.now()
        },
    ];
    var usersRef = collection(db, "users");

    for (let k = 0; k < users.length; k++) {
        await addDoc(usersRef, users[k]);
        console.log('seedingg users');
    }

    var photoRef = collection(db, "photos");
    try {
        for (let i = 1; i <= 5; ++i) {
            console.log('seedinng photos');
            await addDoc(photoRef, {
                photoId: i,
                userId: '2',
                imageSrc: `../images/users/raphael/${i}.jpg`,
                caption: 'Saint george and the Dragon',
                likes: [],
                comments: [
                    {
                        displayName: 'Dali',
                        comment: 'love this place, looks like my animal farm!'
                    },
                    {
                        displayName: 'orwell',
                        comment: 'Would you mind if I used this picture?'
                    }
                ],
                userLatitude: '40.7128°',
                userLongitude: '74.0060°',
                dateCreated: Date.now()
            }, { merge: true }
            );
        }
    }
    catch (e) { console.log(e.message); }
}
export default seedDatabase; */