
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9zQkB4IE3eRXf76-EjZn0EaUP4FPXuiU",
  authDomain: "twitter-build-73f57.firebaseapp.com",
  projectId: "twitter-build-73f57",
  storageBucket: "twitter-build-73f57.appspot.com",
  messagingSenderId: "1048327617549",
  appId: "1:1048327617549:web:2673e3eb8101015e016944"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };