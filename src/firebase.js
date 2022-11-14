// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCbrfhZOs_w0Ljkk7ZUyACdf2n3Iat06VA",
//   authDomain: "login-94043.firebaseapp.com",
//   projectId: "login-94043",
//   storageBucket: "login-94043.appspot.com",
//   messagingSenderId: "1009333574969",
//   appId: "1:1009333574969:web:526407f35eec160ada9ce8",
//   measurementId: "G-SJ8FW25M11"
// };

// // Initialize Firebase
// // const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// import { initializeApp } from "firebase/app";
// ​​import {
// ​​  GoogleAuthProvider,
// ​​  getAuth,
// ​​  signInWithPopup,
// ​​  signInWithEmailAndPassword,
// ​​  createUserWithEmailAndPassword,
// ​​  sendPasswordResetEmail,
// ​​  signOut,
// ​​} from "firebase/auth";
// ​​import {
// ​​  getFirestore,
// ​​  query,
// ​​  getDocs,
// ​​  collection,
// ​​  where,
// ​​  addDoc,
// ​​} from "firebase/firestore";

// const app = ​​initializeApp(firebaseConfig);
// ​​const auth = getAuth(app);
// ​​const db = getFirestore(app);

// const signInWithGoogle = async () => {
//     try {
//       const res = await signInWithPopup(auth, googleProvider);
//       const user = res.user;
//       const q = query(collection(db, "users"), where("uid", "==", user.uid));
//       const docs = await getDocs(q);
//       if (docs.docs.length === 0) {
//         await addDoc(collection(db, "users"), {
//           uid: user.uid,
//           name: user.displayName,
//           authProvider: "google",
//           email: user.email,
//         });
//       }
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   const logInWithEmailAndPassword = async (email, password) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

//   const registerWithEmailAndPassword = async (name, email, password) => {
//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);
//       const user = res.user;
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name,
//         authProvider: "local",
//         email,
//       });
//     } catch (err) {
//       console.error(err);
//       alert(err.message);
//     }
//   };

  
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    return user
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
};
export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};