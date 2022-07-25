// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZG8Ksjl7Bpkondn3y__5Jr7mvWkYzCOs",
  authDomain: "crwn-clothing-db-b2300.firebaseapp.com",
  projectId: "crwn-clothing-db-b2300",
  storageBucket: "crwn-clothing-db-b2300.appspot.com",
  messagingSenderId: "890612774615",
  appId: "1:890612774615:web:d1cf03feaac48b76b22292"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider(); //initalizing provider
provider.setCustomParameters({
  prompt: "select_account" //always ask to select account to user instead of directly going with the primary account
});

export const auth = getAuth(); //initalizing auth (one app requires only one auth only) Singelton
export const signInWithGooglePopup = () => signInWithPopup(auth, provider); // using method to signInWithPopup
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider); // using method to signin with redirect

// creating database
export const db = getFirestore(); //sigelton method

// this is for storing user in database
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid); //(database ,collectioname,here user id)
  // console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists()); //tells whether the user exists in our database or not

  // if user not exits then create
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (err) {
      console.log("error creating the user" + err.message);
    }
    return userDocRef;
  }
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  //for user creation
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  //for user signIn
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// this is for userSignOut
export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangeListener = (callback) => {
  onAuthStateChanged(auth, callback);
};
