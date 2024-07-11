// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxdfNeqACy82RpMrSrCaGqIOJJUj_ORvI",
  authDomain: "ecommerce-dca4b.firebaseapp.com",
  databaseURL: "https://ecommerce-dca4b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ecommerce-dca4b",
  storageBucket: "ecommerce-dca4b.appspot.com",
  messagingSenderId: "212938406359",
  appId: "1:212938406359:web:12ac0ac629a109e8d2b392",
  measurementId: "G-8G7S7BE11P"

  // apiKey={import.meta.env.VITE_API_KEY  as string}
  // authDomain= {import.meta.env.VITE_AUTH_DOMAIN  as string}
  // projectId={import.meta.env.VITE_PROJECT_ID  as string}
  // storageBucket={import.meta.env.VITE_STORAGE_BUCKET  as string}
  // messagingSenderId={import.meta.env.VITE_MESSAGING_SENDER_ID  as string}
  // appId={import.meta.env.VITE_APP_ID  as string}
  // measurementId = {import.meta.env.VITE_MEASUREMENT_ID  as string}
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth(app);

export { app, auth };
