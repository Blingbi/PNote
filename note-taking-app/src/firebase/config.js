// src/firebase/config.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

// 🔑 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyIEd68K2EkWAW1ji4M0CuBd2G1Chmgzs",
  authDomain: "pnote-1063b.firebaseapp.com",
  projectId: "pnote-1063b",
  storageBucket: "pnote-1063b.appspot.com",
  messagingSenderId: "158813606700",
  appId: "1:158813606700:web:004fea0dda5595f27ad289",
  measurementId: "G-LKDX9PPE0X",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// 🔐 Auth functions
export const register = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

// 📝 Firestore functions
export const saveNote = async (uid, text, drawing) => {
  await addDoc(collection(db, "notes"), {
    uid,
    text,
    drawing,
    createdAt: serverTimestamp(),
  });
};

export const fetchNotes = async (uid, setNotes) => {
  const notesRef = collection(db, "notes");
  const q = query(notesRef, where("uid", "==", uid));
  const snapshot = await getDocs(q);

  const notes = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  setNotes(notes);
};