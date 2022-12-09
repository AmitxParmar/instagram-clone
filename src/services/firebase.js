import { db } from "../lib/firebase-config"
import { collection, query, where, getDocs } from "firebase/firestore"

export const doesUserNameExist = async (username) => {

    const colRef = collection(db, "users");

    const q = query(colRef, where("displayName", "==", "amitxparmar"));
    console.log(toString(q));

}
