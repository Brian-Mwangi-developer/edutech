import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "image-upload-7b4fb.firebaseapp.com",
  projectId: "image-upload-7b4fb",
  storageBucket: "image-upload-7b4fb.appspot.com",
  messagingSenderId: "592850312395",
  appId: "1:592850312395:web:17e184cd9fdad117320f4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)