import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-OjECSg-IOgBGsUozLrhAtPP2z_806dk",
  authDomain: "widenet2-3667f.firebaseapp.com",
  projectId: "widenet2-3667f",
  storageBucket: "widenet2-3667f.appspot.com",
  messagingSenderId: "926827020245",
  appId: "1:926827020245:web:07f039620c64b56759475c",
  measurementId: "G-48CCX7RN0B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const firestoreDatabase = getFirestore(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

const FirebaseContext = createContext();

export function FirebaseContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const [username, setUsername] = useState(null);

  // Sign up
  async function signup(email, password) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  }

  // Sign in
  async function signinUser(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  // Sign in with google
  function signupWithGoogle() {
    signInWithPopup(auth, provider);

    // .then((result) => {
    //   console.log(result);
    // })
    // .catch((error) => {
    //   console.error("Error signing in with Google:", error);
    // });
  }

  // auth state
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  });

  // putting username of the user in realtime database
  function putData(key, data) {
    set(ref(database, key), data);
  }

  //sign out fnc
  function signOutCurrentUser() {
    signOut(auth);
  }

  // reading username from the database
  useEffect(() => {
    if (currentUser) {
      get(child(ref(database), `users/${currentUser.uid}`)).then((snapshot) => {
        setUsername(snapshot.val());
      });
    }
  }, [currentUser]);

  // ref for getting the post from firestore
  const postsRef = collection(firestoreDatabase, "posts");

  async function onCreatePost(data) {
    await addDoc(postsRef, {
      description: data.description,
      username: currentUser?.displayName,
      userId: currentUser?.uid,
    });
  }

  return (
    <FirebaseContext.Provider
      value={{
        signup,
        onCreatePost,
        putData,
        signinUser,
        signupWithGoogle,
        currentUser,
        signOutCurrentUser,
        username,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error(
      "useFirebase must be used within a FirebaseContextProvider component"
    );
  }
  return context;
};
