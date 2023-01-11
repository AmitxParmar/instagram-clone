import {
    arrayRemove,
    arrayUnion,
    collection,
    db,
    doc,
    getDoc,
    getDocs,
    limit,
    query,
    updateDoc,
    where,
} from '../lib/FirebaseConfig';

/* ========================= Database References Global =========================== */
const colRefUser = collection(db, "users");
const colRefPhotos = collection(db, "photos");
/* ========================= Database References END =========================== */

/* =========================== Services:: ============================= */
/* ================================================================= */
export async function doesUserNameExist(userName) {
    const querySnapshot = await getDocs(
        query(colRefUser, where("userName", "==", userName.toLowerCase()), limit(5))
    );
    return !querySnapshot.empty;
}

/* ================================================================= */
/* ================================================================= */
// NOTE: Testing done
export const getUserByUserName = async (userName) => {
    let user;
    const q = query(colRefUser, where("userName", "==", userName));
    await getDocs(q)
        .then((users) => {
            user = { ...users.docs[0].data(), docId: users.docs[0].id };
        })
        .catch((err) => {
            console.error('No Such User Found:', err);
        });
    return user;
};


/* ================================================================= */
/* ================================================================= */
// get user from the firestore where userId === userId (passed from the auth)

export async function getUserByUserId(userId) {
    //let userIDData;
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        //userIDData = [{ ...doc.data(), id: doc.id }]
        return { ...docSnap.data(), docId: docSnap.id };
    } else {
        alert('Services:: No such user ID found!');
        console.log("No such user ID found!!");
    }
}

/* ================================================================= */
/* ================================================================= */
// Check all conditions before limit results

export async function getSuggestedProfiles(userId, following) {
    let suggestions = [];
    if (following.length > 0) {
        const docSnapshot = await getDocs(
            query(colRefUser, where("userId", "not-in", [...following, userId]), limit(4))
        );
        docSnapshot.forEach((doc) => {
            suggestions.push({ ...doc.data(), docId: doc.id });
        });
    } else {
        const docSnapshot = await getDocs(
            query(colRefUser, where("userId", "!=", userId), limit(10))
        );
        docSnapshot.forEach((doc) => {
            suggestions.push({ ...doc.data(), docId: doc.id });
        });
    }
    return suggestions;
}

/* ================================================================= */
/* ================================================================= */

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document id (karl's profile)
    profileDocId, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    const docRef = doc(db, "users", loggedInUserDocId);
    updateDoc(docRef, {
        following: isFollowingProfile ?
            arrayRemove(profileDocId) :
            arrayUnion(profileDocId)
    });
}

export async function updateFollowedUserFollowers(
    profileDocId, // currently logged in user document id (karl's profile)
    loggedInUserDocId, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    const docRef = doc(db, "users", profileDocId);
    updateDoc(docRef, {
        followers: isFollowingProfile ?
            arrayRemove(loggedInUserDocId) :
            arrayUnion(loggedInUserDocId)
    });
}

/* ================================================================= */
export async function getPhotos(userId, following) {
    // [5,4,2] => following
    const q = query(colRefPhotos, where("userId", "in", following));
    const querySnapshot = await getDocs(q);
    const userFollowedPhotos = querySnapshot.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id,
    }));
    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            // photo.userId = 2
            const user = await getUserByUserId(photo.userId);
            // raphael
            const { userName } = user;
            return { userName, ...photo, userLikedPhoto };
        })
    );
    return photosWithUserDetails;
}

/* ================================================================= */


/* ================================================================= */
export async function getUserPhotosByUserId(userId) {
    const q = query(colRefPhotos, where("userId", "==", userId));
    const result = await getDocs(q);
    return result.docs.map((photo) => ({
        ...photo.data(),
        docId: photo.id
    }));
}

/* ================================================================= */
/*  ===================== Firebase before version 9 ===================== 
await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', userId)
    .get(); 
    ============================================*/


export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
    const q = query(colRefUser, where('userName', '==', loggedInUserUsername) // Amit (active logged in user)
        , where('following', 'array-contains', profileUserId));
    const result = getDocs(q);

    /* <================== replaced code =======================>

     await firebase
        .firestore()
        .collection('users')
        ,where('userName', '==', loggedInUserUsername) // karl (active logged in user)
        ,where('following', 'array-contains', profileUserId)
        .get(); 
        
        <================== replaced code =======================>*/

    const [response = {}] = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return response.userId;
}

export async function toggleFollow(
    isFollowingProfile,
    activeUserDocId,
    profileDocId,
    profileUserId,
    followingUserId
) {
    // 1st param: karl's doc id
    // 2nd param: raphael's user id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile);
    // 1st param: karl's user id
    // 2nd param: raphael's doc id
    // 3rd param: is the user following this profile? e.g. does karl follow raphael? (true/false)
    await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile);
}
