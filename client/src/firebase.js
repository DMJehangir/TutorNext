import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAk1D6mYeWihS3ALard_3sZ_3d7bgGPhPY",
  authDomain: "tutornext-547de.firebaseapp.com",
  projectId: "tutornext-547de",
  storageBucket: "tutornext-547de.appspot.com",
  messagingSenderId: "51157110307",
  appId: "1:51157110307:web:7778450d33e13102602b96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;