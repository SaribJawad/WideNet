import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createContext, useContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

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
const provider = new GoogleAuthProvider();
const auth = getAuth();

const FirebaseContext = createContext();

export function FirebaseContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

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
      console.log(user);
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

  return (
    <FirebaseContext.Provider
      value={{
        signup,
        putData,
        signinUser,
        signupWithGoogle,
        currentUser,
        signOutCurrentUser,
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
