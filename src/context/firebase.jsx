import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createContext, useContext } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
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
const auth = getAuth();

const FirebaseContext = createContext();

export function FirebaseContextProvider({ children }) {
  // Sign Up
  async function signup(email, password) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential;
  }

  function putData(key, data) {
    set(ref(database, key), data);
  }

  return (
    <FirebaseContext.Provider value={{ signup, putData }}>
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
