import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

export default app;
