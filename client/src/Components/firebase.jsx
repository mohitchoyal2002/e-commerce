import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDKcOHTJyQxsbnUxB5eaw6ZAnRUXXJhkTY",
  authDomain: "shop-app-e8ac8.firebaseapp.com",
  projectId: "shop-app-e8ac8",
  storageBucket: "shop-app-e8ac8.appspot.com",
  messagingSenderId: "471806156589",
  appId: "1:471806156589:web:bc5375c96ea728a1c87da4",
  measurementId: "G-GNLCGC8FB0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()