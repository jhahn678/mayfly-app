import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCBeYhBvhHMoVrp-wxXthR7AU5aYMuQO2s",
  authDomain: "mayfly-349702.firebaseapp.com",
  projectId: "mayfly-349702",
  storageBucket: "mayfly-349702.appspot.com",
  messagingSenderId: "45477378355",
  appId: "1:45477378355:web:4519b3b45304bcde2e2646",
  measurementId: "G-28G0940KFJ"
};

const app = initializeApp(firebaseConfig)


export const db = getFirestore(app)
export const auth = getAuth()