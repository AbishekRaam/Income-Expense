import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBeUMgAP13f2ZiN_xXquUeP33v5buU-2aU",
  authDomain: "sst-invoice.firebaseapp.com",
  projectId: "sst-invoice",
  storageBucket: "sst-invoice.appspot.com",
  messagingSenderId: "895497103822",
  appId: "1:895497103822:web:931f10fcb3dce1bf6ee39f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}