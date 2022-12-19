import { db } from "../lib/FirebaseConfig"
import { collection, where, query, limit, getDocs } from "../lib/FirebaseConfig"

const colRefUser = collection(db, "users");

export const doesUserNameExist = async (username) => {
    const querySnapshot = await getDocs(query(
        colRefUser,
        where("userName", "==", username),
        limit(1)
    ));
    console.log("doesUserNameExists check " + JSON.stringify(querySnapshot));
    return !querySnapshot.empty
}
export async function getuserByUsername(userName) {
    const querySnapshot = await getDocs(query(colRefUser, where('userName', '==', userName.toLowerCase())));

    return querySnapshot.docChanges.map(item => ({
        ...item.data(),
        docId: item.id
    }));
}

// get user from the firestore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
    const querySnapshot = await getDocs(query(
        colRefUser,
        where("userId", "==", userId),
        limit(1)
    ));
    const user = querySnapshot.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    return user;
}

// Check all conditions before limit results
export async function getSuggestedProfiles(userId, following) {
    let suggestions = [];
    if (following.length > 0) {
        const suggestions = await getDocs(query(colRefUser, where("userId", "not-in", userId)))
    }
    else {
        const suggestions = await getDocs(query(colRefUser("userId", "!=", userId), limit(10)))
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
const q = await getDocs(colRef, where("displayName", "==", username.toLowerCase()))
async function emailAlreadyExists(email) {
const db = getFirestore();
 */
