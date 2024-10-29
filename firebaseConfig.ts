// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCVinDtYY9PKk_kWERO6VwQlEGg84qoQro",
    authDomain: "dopamine-7546c.firebaseapp.com",
    projectId: "dopamine-7546c",
    storageBucket: "dopamine-7546c.appspot.com",
    messagingSenderId: "574353589449",
    appId: "1:574353589449:web:3e93e807b6982e3791b918",
    measurementId: "G-GT5JVNQNPS"
};
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);