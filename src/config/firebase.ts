import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, RecaptchaVerifier } from "firebase/auth";

// Firebase configuration
// Replace these with your actual Firebase config values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "",
};

// Check if Firebase is configured
const isFirebaseConfigured = firebaseConfig.apiKey && 
  firebaseConfig.authDomain && 
  firebaseConfig.projectId;

// Initialize Firebase only if configured
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (isFirebaseConfigured) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
  } catch (error) {
    console.error("Firebase initialization error:", error);
  }
} else {
  console.warn("Firebase is not configured. Phone authentication will not work. Please set Firebase environment variables.");
}

// Initialize Firebase Authentication and get a reference to the service
export { auth };

// Initialize reCAPTCHA verifier
let recaptchaVerifier: RecaptchaVerifier | null = null;

export const getRecaptchaVerifier = (): RecaptchaVerifier => {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized. Please configure Firebase environment variables.");
  }
  
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {
        // reCAPTCHA solved, allow signInWithPhoneNumber
      },
      "expired-callback": () => {
        // Response expired, ask user to solve reCAPTCHA again
      },
    });
  }
  return recaptchaVerifier;
};

export default app;
