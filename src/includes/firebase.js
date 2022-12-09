import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "music-app-1ad71.firebaseapp.com",
  projectId: "music-app-1ad71",
  storageBucket: "music-app-1ad71.appspot.com",
  appId: "1:782028209056:web:2b3973b3453fb8ed26c2c5",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
// enable firebase persistence to save a copy of db for offline
db.enablePersistence().catch((error) => {
  console.log(`Firebase Persistence error ${error.code}`);
});
const userCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");
const storage = firebase.storage();
export {
  auth,
  db,
  userCollection,
  songsCollection,
  commentsCollection,
  storage,
};
