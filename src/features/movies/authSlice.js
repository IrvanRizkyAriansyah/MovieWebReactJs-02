import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { query, collection, getDocs, where } from "firebase/firestore";
// import { auth, db } from "../../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";

// export const getLogin = createAsyncThunk(
//     "movies/getLogin", async (values) => {
//         console.log(values)
//         try {
//             const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users/login",values)
//             localStorage.setItem("token",JSON.stringify(res.data.data.token))
//             localStorage.setItem("user",JSON.stringify(res.data.data))
//             window.location.reload(1);
//             return res.data.data
//         } catch (error) {
//             console.error(error)
//         }
//     }
// )
import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
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

// const signInWithGoogle = async () => {
//     try {
//         const res = await signInWithPopup(auth, googleProvider);
//         const user = res.user;
//         const q = query(collection(db, "users"), where("uid", "==", user.uid));
//         const docs = await getDocs(q);
//         if (docs.docs.length === 0) {
//             await addDoc(collection(db, "users"), {
//                 uid: user.uid,
//                 name: user.displayName,
//                 authProvider: "google",
//                 email: user.email,
//             });
//         }
//         localStorage.setItem("token",JSON.stringify(user.accessToken))
//         localStorage.setItem("user",JSON.stringify(user))
//         return user
//     } catch (err) {
//         console.error(err);
//         alert(err.message);
//     }
// };

export const LoginGoogle = createAsyncThunk(
    "movies/LoginGoogle", async () => {
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
            localStorage.setItem("token", JSON.stringify(user.accessToken))
            localStorage.setItem("user", JSON.stringify(user))
            window.location.reload(1);
            return user
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
)

export const LoginEmail = createAsyncThunk(
    "movies/Login", async (values) => {
        try {
            const res = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = res.user
            localStorage.setItem("token", JSON.stringify(user.stsTokenManager.accessToken))
            localStorage.setItem("user", JSON.stringify(user))
            window.location.reload(1);
            return user.providerData[0]
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }
)

// export const getLogin = createAsyncThunk(
//     "movies/getLogin", async (user) => {
//         try {
//             const q = query(collection(db, "users"), where("uid", "==", user?.uid));
//             const doc = await getDocs(q);
//             const data = doc.docs[0].data();
//             console.log(data)
//             return data
//           } catch (err) {
//             console.error(err);
//             alert("An error occured while fetching user data");
//           }
//     }
// )

// export const getRegister = createAsyncThunk(
//     "movies/getRegister", async (values) => {
//         try {
//             const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users", values);
//             localStorage.setItem("token", JSON.stringify(res.data.data.token))
//             localStorage.setItem("user", JSON.stringify(res.data.data))
//             window.location.reload(1);
//             return res.data.data
//         } catch (error) {
//             console.error(error)
//         }
//     }
// )

export const Register = createAsyncThunk(
    "movies/Register", async (values) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = res.user;
            await updateProfile(auth.currentUser, { displayName: values.name }).catch(
                (err) => console.log(err)
              );
            await addDoc(collection(db, "users"), {
              uid: user.uid,
              name: values.name,
              authProvider: "local",
              email: values.email,
            });
            localStorage.setItem("token", JSON.stringify(user.accessToken));
            localStorage.setItem("user", JSON.stringify(user.providerData[0]));
            window.location.reload(1)
            return user
          } catch (err) {
            console.error(err);
            alert(err.message);
          }
    }
)

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loginGoogle: [],
        loginEmail: [],
        register: [],
        loading: false,
    },
    reducers: {},
    extraReducers: {
        [LoginGoogle.pending]: (state) => {
            state.loading = true
        },
        [LoginGoogle.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.login = payload
        },
        [LoginGoogle.rejected]: (state) => {
            state.loading = false
        },
        [LoginEmail.pending]: (state) => {
            state.loading = true
        },
        [LoginEmail.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.login = payload
        },
        [LoginEmail.rejected]: (state) => {
            state.loading = false
        },
        [Register.pending]: (state) => {
            state.loading = true
        },
        [Register.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.login = payload
        },
        [Register.rejected]: (state) => {
            state.loading = false
        },

    }
})

export const authReducer = authSlice.reducer