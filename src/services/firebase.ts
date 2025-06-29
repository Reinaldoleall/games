import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC_3r8eyU0CeveN6XsrvXTY-E7xaK4akQ8",
  authDomain: "gamestore-ebb55.firebaseapp.com",
  projectId: "gamestore-ebb55",
  storageBucket: "gamestore-ebb55.firebasestorage.app",
  messagingSenderId: "212451211586",
  appId: "1:212451211586:web:2a6aa0339353eceed770db"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;