import { getFirestore } from "@firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDpZTpULXWL8qOovDl24hczpOk1RuQ0Dgw",
    authDomain: "fir-fc5ba.firebaseapp.com",
    projectId: "fir-fc5ba",
    storageBucket: "fir-fc5ba.appspot.com",
    messagingSenderId: "39491095298",
    appId: "1:39491095298:web:61c25ff924d28954cf901b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db,storage };
export { auth };
export default app;
