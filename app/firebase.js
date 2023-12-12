import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBX0PAW_QRZOVTy04a4hCz3vsh0YFNyWJ8",
  authDomain: "fir-8b699.firebaseapp.com",
  projectId: "fir-8b699",
  storageBucket: "fir-8b699.appspot.com",
  messagingSenderId: "144496096496",
  appId: "1:144496096496:web:31abe64a9b421ca5e93e35",
  measurementId: "G-K63CPFGS5Q"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);