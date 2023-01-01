import { collection, db, doc, FieldValue, getDoc, getDocs, limit, query, updateDoc, where } from '../lib/FirebaseConfig';

const colRefUser = collection(db, "users");

export async function doesUserNameExist(userName) {
    const querySnapshot = await getDocs(
        query(colRefUser, where("userName", "==", userName.toLowerCase()), limit(1))
    );

    return !querySnapshot.empty;
}
// NOTE: Testing done
export const getUserByUserName = async (userName) => {
    let user;
    const q = query(colRefUser, where("userName", "==", userName));
    await getDocs(q)
        .then((users) => {
            user = { ...users.docs[0].data(), docId: users.docs[0].id };
        });
    console.log('user check towards the end', user);
    return user;
};

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
        console.log("no such UserByUserId found");
    }

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
            query(colRefUser, where("userId", "!=", userId), limit(10))
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
    loggedInUserDocId, // currently logged in user document id (karl's profile)
    profile, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    const docRef = doc(db, "users", loggedInUserDocId.toLowerCase());
    updateDoc(docRef);
    console.log(FieldValue);

}

export async function getPhotos(userId, following) {
    // [5,4,2] => following
    const colRefPhotos = collection(db, "photos");
    const q = query(colRefPhotos, where("userId", "in", following));
    const querySnapshot = await getDocs(q);
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
