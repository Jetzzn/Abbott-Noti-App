import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyC5G5jICwXH7PPuOxwTD-DXUZ3UnxMjZ64",
  authDomain: "abbot-e2d4c.firebaseapp.com",
  projectId: "abbot-e2d4c",
  storageBucket: "abbot-e2d4c.firebasestorage.app",
  messagingSenderId: "262076126066",
  appId: "1:262076126066:web:f7cfe573a00eca064f83eb",
  measurementId: "G-TWEP15F5Y9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export { messaging };