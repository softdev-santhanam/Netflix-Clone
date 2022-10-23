import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCcykaFnylKM0gppMfsSyKl7rtBOmTMf8c",
  authDomain: "moviebox-de36b.firebaseapp.com",
  projectId: "moviebox-de36b",
  storageBucket: "moviebox-de36b.appspot.com",
  messagingSenderId: "871493691346",
  appId: "1:871493691346:web:32a89d43c3a00b2fc64a0b",
  measurementId: "G-MK2HQEW46R"
};


const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
