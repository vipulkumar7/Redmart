/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider
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
  const user = result.user;
  console.log(user);
  // add user to firestore
};

export const doSignInWithGithub = async () => {
  const provider = new GithubAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  console.log(user);
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
