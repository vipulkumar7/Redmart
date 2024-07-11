/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState, useEffect, ReactNode } from "react";
import { auth } from "../../firebase/firebase";
// import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

interface ChildrenProps {
  children?: ReactNode
}

interface ValueProps {
  userLoggedIn: boolean;
  isEmailUser: boolean;
  isGoogleUser: boolean;
  currentUser: null;
  setCurrentUser: React.Dispatch<React.SetStateAction<null>>;
}

const AuthContext = React.createContext<ValueProps | null>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: ChildrenProps) {
  const [currentUser, setCurrentUser] = useState<null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)
  const [isEmailUser, setIsEmailUser] = useState<boolean>(false)
  const [isGoogleUser] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    // console.log(unsubscribe, 'unsubscribe')
    return unsubscribe;
  }, []);

  async function initializeUser(user: any) {
    if (user) {

      setCurrentUser({ ...user });

      // check if provider is email and password login
      const isEmail = user.providerData.some(
        (provider: any) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      // check if the auth provider is google or not
      //   const isGoogle = user.providerData.some(
      //     (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
      //   );
      //   setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
  }

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser
  };

  console.log({ value })

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
