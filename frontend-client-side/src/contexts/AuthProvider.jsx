import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';


import { auth } from '../config/firebase.config'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import {  GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { LoadingContext } from './LoadingProvider';

import Loading from '../components/Loading';


const googleProvider = new GoogleAuthProvider();


export const AuthContext = createContext();

const AuthProvider = ( {children} ) => {
  const [ user, setUser ] = useState(null);
  const { loading, setLoading } = useContext(LoadingContext);

  
  // firebase functions 
  const createNewUser = async (email, password) => {
    // setLoading(true);
    try{
      return await createUserWithEmailAndPassword(auth, email, password);
    }
    finally{
      // setLoading(false);
    }
  }

  const updateUserProfile = async (updatedData) => {
    try{
      return await updateProfile(auth.currentUser, updatedData);
    }
    finally{
      // setLoading(false);
    }
  }

  const signOutUser = async () => {
    setLoading(true);
    try{
      return await signOut(auth);
    }
    finally{
      setLoading(false);
    }
  }

  const signInUser = async (email, password) => {
    // setLoading(true);
    try{
      return await signInWithEmailAndPassword(auth, email, password);
    }
    finally{
      // setLoading(false);
    }
  }

  const signInWithGoogle = async () => {
    setLoading(true);
    try{
      return signInWithPopup(auth, googleProvider);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
     setUser(currentUser);
     setLoading(false);
   })
   return () => {
     unsubscribe();
   };
  }, [])


  // jei value or function gula share korte chacchi -> object banaye share korbo
  const authInfo = {
    user,
    setUser,
    createNewUser,
    updateUserProfile,
    signOutUser,
    signInUser,
    signInWithGoogle,
    
  }
  

  return (
    <div>
      <AuthContext.Provider value={ authInfo }>
        { loading ? <Loading></Loading> : children }
      </AuthContext.Provider>
    </div>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AuthProvider;