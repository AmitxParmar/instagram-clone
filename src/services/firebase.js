import { collection, db, doc, getDoc, getDocs, limit, query, where } from '../lib/FirebaseConfig';

const colRefUser = collection(db, "users");

export async function doesUserNameExist(userName) {
    const querySnapshot = await getDocs(
        query(colRefUser, where("userName", "==", userName.toLowerCase()), limit(1))
    );
    console.log("doesUserNameExists check " + JSON.stringify(querySnapshot));
    return !querySnapshot.empty;
}
// NOTE: Testing done
export async function getUserByUserName(userName) {
    const q = query(colRefUser, where("userName", "==", userName.toLowerCase()));
    const users = await getDocs(q);
    return users.docs.map((item) => ({
        ...item.data(),
        docId: item.id,
    }));
}
console.log(JSON.stringify(getUserByUserName("jack")));

// get user from the firestore where userId === userId (passed from the auth)

export async function getUserByUserId(userId) {
    let userIDData;
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        //userIDData = [{ ...doc.data(), id: doc.id }]
        userIDData = { ...docSnap.data(), docId: docSnap.id };
    } else {
        console.log("no such userbyuserid found");
    }
    return userIDData;
}

// Check all conditions before limit results

export async function getSuggestedProfiles(userId, following) {
    let suggestions = [];
    if (following.length > 0) {
        const docSnapshot = await getDocs(
            query(colRefUser, where("userId", "not-in", [...following, userId]), limit(1))
        );
        docSnapshot.forEach((doc) => {
            suggestions.push({ ...doc.data(), docId: doc.id });
            // doc.data() is never undefined for query doc snapshots
            console.log('suggested pRofiles', doc.id, " => ", doc.data());
        });
    } else {
        const docSnapshot = await getDocs(
            query(colRefUser, where("userId", "!=", userId), limit(1))
        );
        docSnapshot.forEach((doc) => {
            suggestions.push({ ...doc.data(), docId: doc.id });
            // doc.data() is never undefined for query doc snapshots
            console.log('suggested pRofiles', doc.id, " => ", doc.data());
        });
    }
    return suggestions;
}

export async function updateLoggedInUserFollowing(
    loggedinUserDocId, // currently logged in user document id (karl's profile)
    profile, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {


}

export async function getPhotos(userId, following) {
    // [5,4,2] => following
    const colRefPhotos = collection(db, "photos");
    const querySnapshot = await getDocs(
        query(colRefPhotos, where("userId", "in", following))
    );

    return querySnapshot.doc.map((photo) => ({
        ...photo.data(),
        docId: photo.id,
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
