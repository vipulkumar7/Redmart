/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../axiosInstance";
import { loginApiCall } from "../commonFunction";
import API_ENDPOINTS from "../config/apiconfig";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const googleUserData: any = result.user;

  // Verifying if this Google user already exists in the database.
  const response = await axiosInstance?.post(
    `${API_ENDPOINTS.isGoogleLoginUser}`,
    JSON.stringify({ email: googleUserData.email })
  );

  const {
    data: { email, isGoogleLoggedIn },
  } = response;

  const userData = {
    email: email,
    password: import.meta.env.VITE_GOOGLE_PASSWORD,
  };

  // If the Google user is already in the database, proceed with the login.
  isGoogleLoggedIn && (await loginApiCall(userData));

  try {
    const newUser = {
      email: googleUserData.email,
      fullName: googleUserData.displayName,
      password:
        googleUserData.emailVerified && import.meta.env.VITE_GOOGLE_PASSWORD,
    };

    // If the Google user is not in the database, proceed with the signup.
    if (!isGoogleLoggedIn) {
      const response = await axiosInstance?.post(
        `${API_ENDPOINTS.createUser}`,
        newUser
      );
      const {
        data: {
          jwtToken,
          data: { _id: userId, fullName },
        },
        status,
      } = response;
      if (status === 201) {
        document.cookie = `authToken=${jwtToken}`;
        document.cookie = `userId=${userId}`;
        document.cookie = `fullName=${fullName}`;
      }
    }
  } catch (error) {
    console.log(error, "error");
  }
};

export const doSignInWithGithub = async () => {
  const provider = new GithubAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user: any = result.user;
  document.cookie = `authToken=${user.accessToken}`;
  document.cookie = `userId=${user.uid}`;
  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
  return updatePassword(auth.currentUser as any, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser as any, {
    url: `${window.location.origin}/`,
  });
};
