import { db } from "../lib/FirebaseConfig"
import { collection, where, getDoc, query, limit, getDocs, doc, onSnapshot } from "../lib/FirebaseConfig"


const colRefUser = collection(db, "users");

export async function doesUserNameExist(userName) {
    const querySnapshot = await getDocs(query(
        colRefUser,
        where("userName", "==", userName.toLowerCase()),
        limit(1)
    ));
    console.log("doesUserNameExists check " + JSON.stringify(querySnapshot));
    return !querySnapshot.empty
}

export async function getUserByUserName(userName) {

    const querySnapshot = await getDocs(
        query(colRefUser,
            where('userName', '==', userName.toLowerCase())
        ));
    return querySnapshot.docs.map(item => ({
        ...item.data(),
        docId: item.id
    }));
}

// get user from the firestore where userId === userId (passed from the auth)

export async function getUserByUserId(userId) {
    let userIDData = [];
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
        //userIDData = [{ ...doc.data(), id: doc.id }]
        console.log("yes the searched docsnap exists " + JSON.stringify(docSnap.data()))
        userIDData = { ...docSnap.data(), docId: docSnap.id }
    }
    else {
        console.log('no such userbyuserid found')
    }
    /* .catch ((err) => { console.log('error msg coming from getuserbyyuserid firebase ' + err.message) }) */
    return userIDData

    /* const querySnapshot = await getDoc(query(
        colRefUser,
        where("userId", "==", userId),
    ));
    console.log(querySnapshot.data());
    const userIDData = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    return userIDData.data(); */
}
console.log('logging the useid function it self' + getUserByUserId('UZLLrCDjmUMk1Gxfp8OVhy3VEGC3'))


// Check all conditions before limit results
export async function getSuggestedProfiles(userId, following) {
    let suggestions = [];
    if (following.length > 0) {
        suggestions = await getDocs(query(colRefUser, where("userId", "not-in", userId)))
    }
    else {
        suggestions = await
            getDocs(
                query(
                    colRefUser("userId", "!=", userId),
                    limit(10)))
    }
    console.log(suggestions)
    return suggestions;
}

export async function updateLoggedInUserFollowing(loggedinUserDocId, // currently logged in user document id (karl's profile)
    profile, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    console.log("updateLoggedInUsersFollowing")
}

export async function getPhotos(userId, following) {
    // [5,4,2] => following
    const colRefPhotos = collection(db, "users");
    const querySnapshot = await getDocs(query(colRefPhotos, where('userId', 'in', following)));

    return querySnapshot.doc.map(photo => ({
        ...photo.data(),
        docId: photo.id
    }));
}

/*
const q = await getDocs(colRef, where("displayName", "==", userName.toLowerCase()))
async function emailAlreadyExists(email) {
const db = getFirestore();
 */
export async function updateFollowedUserFollowers(
    profileDocId, // currently logged in user document id (karl's profile)
    loggedInUserDocId, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    /* return firebase
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            followers: isFollowingProfile ?
                FieldValue.arrayRemove(loggedInUserDocId) :
                FieldValue.arrayUnion(loggedInUserDocId)
        }); */
}
