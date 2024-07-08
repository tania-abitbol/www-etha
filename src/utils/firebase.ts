import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyALzRBBKv6urebm9d0Z8ENHPpYVaKpKY6A",
  authDomain: "etha-2f277.firebaseapp.com",
  projectId: "etha-2f277",
  storageBucket: "etha-2f277.appspot.com",
  messagingSenderId: "617505561323",
  appId: "1:617505561323:web:4206aaa00853add30a7cae",
  measurementId: "G-YL7E46QGNW",
};

let app: FirebaseApp;
let analytics: Analytics;

export const initializeFirebase = () => {
  if (typeof window !== "undefined" && !app) {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
  }
};

export { analytics };
