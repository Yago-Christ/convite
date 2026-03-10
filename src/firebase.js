import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForDemo",
  authDomain: "convite-18-anos.firebaseapp.com",
  projectId: "convite-18-anos",
  storageBucket: "convite-18-anos.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot }
