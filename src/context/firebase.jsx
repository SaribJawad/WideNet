import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-OjECSg-IOgBGsUozLrhAtPP2z_806dk",
  authDomain: "widenet2-3667f.firebaseapp.com",
  projectId: "widenet2-3667f",
  storageBucket: "widenet2-3667f.appspot.com",
  messagingSenderId: "926827020245",
  appId: "1:926827020245:web:07f039620c64b56759475c",
  measurementId: "G-48CCX7RN0B",
};

interface FirebaseContextType {
  signup: (email: string, password: string) => Promise<any>;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

const FirebaseContext = (createContext < FirebaseContextType) | (null > null);

export function FirebaseContextProvider(children) {
  // Sign Up
  async function signup(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  }

  return (
    <FirebaseContext.Provider value={{ signup }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => useContext(FirebaseContext);
