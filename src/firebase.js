import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAlEvh2t4F3Ys34wweLT2G57_CMBi_7R7M",
  authDomain: "convite-18-anos.firebaseapp.com",
  projectId: "convite-18-anos",
  storageBucket: "convite-18-anos.firebasestorage.app",
  messagingSenderId: "733524388932",
  appId: "1:733524388932:web:2af831ad7d92d9d4a3a011",
  measurementId: "G-C6XR7VH007"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot }
