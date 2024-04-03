import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth"
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'

const firebaseConfig1 = {
  apiKey: "AIzaSyBeUMgAP13f2ZiN_xXquUeP33v5buU-2aU",
  authDomain: "sst-invoice.firebaseapp.com",
  projectId: "sst-invoice",
  storageBucket: "sst-invoice.appspot.com",
  messagingSenderId: "895497103822",
  appId: "1:895497103822:web:931f10fcb3dce1bf6ee39f"
};
const firebaseConfig2 = {

  apiKey: "AIzaSyC3QJGdNdbzPRoi5usIcbGqGjA9jWl4AtY",

  authDomain: "sst-lsm.firebaseapp.com",

  projectId: "sst-lsm",

  storageBucket: "sst-lsm.appspot.com",

  messagingSenderId: "743685208691",

  appId: "1:743685208691:web:249e83e08e9f0fa2190806",

  measurementId: "G-ZKMJGYD2K1"

};

// Initialize Firebase
const app1 = initializeApp(firebaseConfig1,'Project1');
const db = getFirestore(app1)
const app2 = initializeApp(firebaseConfig2,"Project2");
const auth = getAuth(app2);
const db2 = getFirestore(app2)
const storage = getStorage(app2)

export {db,db2,auth,storage}