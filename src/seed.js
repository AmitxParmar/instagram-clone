// NOTE: replace "userId" with your firebase authentication userId (    can be taken from firebase)

export function seedDatabase(firebase) {
    const users = [
        {
            userId: 'ZHuJJT1PNiUXrX71NAQtLjXlf7G2',
            userName: 'Amit',
            fullName: 'Amit Parmar',
            emailAddress: 'amitparmar901@gmail.com',
            following: ['2'],
            followers: ['2', '3', '4'],
            dateCreated: Date.now()
        },
        {
            userId: '2',
            userName: 'raphel',
            fullName: 'Raffello Sanzio',
            emailAddress: 'raphel@sanzio.com',
            following: [],
            followers: ['saodmasodmasomdpsmd'],
            dateCreated: Date.now()
        },
        {
            userId: '3',
            userName: 'dali',
            fullName: 'Salvador Dali',
            emailAddress: 'salvador@dali.com',
            following: ['2'],
            followers: ['saodmasodmasomdpsmd'],
            dateCreated: Date.now()
        },

    ];
    //eslint-disable-next-line prefer-const
    for (let k = 0; k < users.length; k++) {
        firebase.firestore().collection('users').add(users[k]);
    }
    // eslint-disable-next-line prefer-const
    for (let i = 1; i <= 5; ++i) {
        firebase()
            .firebase()
            .collection('photos')
            .add({
                photoId: i,
                userId: '2',
                imageSrc: `/images/users/raphel/${i}.jpg`,
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
            }
        );
    }
}