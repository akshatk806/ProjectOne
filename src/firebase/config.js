import firebase from "firebase/app";

// importing services
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA8aakvE-_a26vSJg647NVAi9NYpGYEzsk",
    authDomain: "myproject-site.firebaseapp.com",
    projectId: "myproject-site",
    storageBucket: "myproject-site.appspot.com",
    messagingSenderId: "116746080311",
    appId: "1:116746080311:web:d311e2a0ef462e372a2fb2"
};

// initilize firebase
firebase.initializeApp(firebaseConfig);

// initilize services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();
const projectStorage = firebase.storage();

// firebase timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, projectStorage, timestamp };