import { db } from "../lib/FirebaseConfig"
import { collection, where, query, limit, getDocs } from "../lib/FirebaseConfig"


export const doesUserNameExist = async (username) => {
    const colRef = collection(db, "users");
    const querySnapshot = await getDocs(query(
        colRef,
        where("userName", "==", username),
        limit(1)
    ));
    console.log("doesUserNameExists check " + JSON.stringify(querySnapshot));
    return !querySnapshot.empty
}
export async function getuserByUserId(userId) {
    const colRef = collection(db, "users");
    const querySnapshot = await getDocs(query(
        colRef,
        where("userId", "==", userId),
        limit(1)
    ));

    const user = querySnapshot.docs.map((item) => ({
        ...item.data(),
    }));
    return user;
}

/*
const q = await getDocs(colRef, where("displayName", "==", username.toLowerCase()))
async function emailAlreadyExists(email) {
const db = getFirestore();
 */
