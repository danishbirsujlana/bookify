import { useContext } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: "AIzaSyA1FZXZKEd_bAKLvE0QxZ_k2YLxUAcXqkw",
    authDomain: "bookify-e48d5.firebaseapp.com",
    projectId: "bookify-e48d5",
    storageBucket: "bookify-e48d5.appspot.com",
    messagingSenderId: "1087174683733",
    appId: "1:1087174683733:web:032400de99e099467278dc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const FirebaseProvider = ({ children }) => {
    const signup = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    return (
        <FirebaseContext.Provider value={{
            signup
        }}>
            {children}
        </FirebaseContext.Provider>
    )
};

export const useFirebase = () => useContext(FirebaseContext);