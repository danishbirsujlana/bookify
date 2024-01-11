import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
} from 'firebase/auth';

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
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);
const storage = getStorage(app);

export const FirebaseProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoggedIn(true);
                setUser(user);
            }
            else setLoggedIn(false);
        })
    }, [])

    const signup = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    const login = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass);
    }

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const handleCreateList = async (data) => {
        const { name, isb, price, coverPic } = data;
        const imageRef = ref(storage, `uploads/images/${Date.now()}-${coverPic.name}`);
        const uploadRes = await uploadBytes(imageRef, coverPic);
        const res = await addDoc(collection(firestore, "books"), {
            name,
            isb,
            price,
            img: uploadRes.ref.fullPath,
            user_id: user.uid,
            user_email: user.email,
            user_name: user.displayName,
        });
        return res;
    }

    const getAllBooks = async () => {
        return await getDocs(collection(firestore, "books"));
    }

    const getImage = async (path) => {
        return await getDownloadURL(ref(storage, path));
    }

    const getBookById = async (id) => {
        const decRef = doc(firestore, "books", id);
        const result = await getDoc(decRef);
        return result.data();
    }

    const placeOrder = async (book_id, qty) => {
        const collRef = collection(firestore, "books", book_id, "orders");
        const res = await addDoc(collRef, {
            user_id: user.uid,
            qty,
        })
        return res;
    }

    const fetchOrders = async () => {
        if (!user || !user.uid) return null;
        const collRef = collection(firestore, "books");
        console.log(user.uid);
        const qry = query(collRef, where("user_id", "==", user.uid));
        const res = await getDocs(qry);
        return res.docs;
    }

    return (
        <FirebaseContext.Provider value={{
            signup,
            login,
            loginWithGoogle,
            loggedIn,
            handleCreateList,
            getAllBooks,
            getImage,
            getBookById,
            placeOrder,
            fetchOrders
        }}>
            {children}
        </FirebaseContext.Provider>
    )
};

export const useFirebase = () => useContext(FirebaseContext);