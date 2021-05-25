import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtv0SrPL04mrat1QIvWI8Q4e7yGoWgt1s",
  authDomain: "ict342-user.firebaseapp.com",
  databaseURL: "https://ict342-user-default-rtdb.firebaseio.com",
  projectId: "ict342-user",
  storageBucket: "ict342-user.appspot.com",
  messagingSenderId: "71121181583",
  appId: "1:71121181583:web:475e97730cdd78962189fa"
};


export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth_ = firebase.auth;
export const auth = firebase.auth();
export const firestore = firebase.firestore();


export const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};


export const generateUserDocument = async (user, displayName, phoneNumber) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const rule = "";
        const photoUrl = "";
        const { email } = user;
        try {
            await userRef.set({
                email,
                displayName,
                phoneNumber,
                rule,
                photoUrl,
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};

