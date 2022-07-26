import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import * as firebaseui from 'firebaseui';
import { Dispatch, SetStateAction } from 'react';
import Types from '../types/index.t';

const $firebase = (() => {
  // firebase config
  const firebaseConfig = {
    apiKey: 'AIzaSyDiBv7eaVD8U3fn_6bvUztAraBMtCEfr_w',
    authDomain: 'twitter-clone-bea49.firebaseapp.com',
    projectId: 'twitter-clone-bea49',
    storageBucket: 'twitter-clone-bea49.appspot.com',
    messagingSenderId: '474611141837',
    appId: '1:474611141837:web:6871b96308b7071b2e2d84',
    measurementId: 'G-8FZLTHJKS0',
  };

  // initialize firebase
  firebase.initializeApp(firebaseConfig);

  // firebase auth
  const auth = firebase.auth();

  // firebase firestore
  const db = firebase.firestore();

  // firebase storage
  const storageRef = firebase.storage().ref();

  // firebase ui instance
  const ui =
    firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

  // firebase ui config
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: 'google.com',
        fullLabel: 'Continue with Google',
      },
      {
        provider: 'phone',
        recaptchaParameters: {
          size: 'invisible',
        },
        fullLabel: 'Continue with Phone',
        defaultCountry: 'IN',
      },
      'anonymous',
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
    },
    tosUrl: '/terms-of-service',
    privacyPolicyUrl: '/privacy-policy',
  };

  // firebase ui render
  const renderUi = (container: string) => {
    ui.start(container, uiConfig);
  };

  // signing out
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.location.assign('/');
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  // singing state observer
  const onAuthStateChanged = (callback: Types.setUidCallback) => {
    auth.onAuthStateChanged((_user) => {
      if (_user) {
        callback(_user.uid);
        // User is signed in.
      } else {
        callback(_user);
      }
    });
    return true;
  };

  // get user data
  const getCurrentUser = (
    callback: Dispatch<SetStateAction<Types.userProfile>>
  ) => {
    db.collection('users')
      .doc(auth.currentUser?.uid)
      .onSnapshot((doc) => {
        callback({ ...doc.data(), id: doc.id });
      });
  };

  // get Profile
  const getProfile = async (
    uid: string | undefined = auth.currentUser?.uid
  ) => {
    const profile = await db.collection('users').doc(uid).get();
    return { ...profile.data(), id: profile.id };
  };

  const getProfileByUsername = async (username: string) => {
    const profile = await db
      .collection('users')
      .where('userName', '==', username)
      .get();
    return profile.docs.length > 0
      ? { ...profile.docs[0].data(), id: profile.docs[0].id }
      : null;
  };

  const isUsernameExist = async (username: string) => {
    const profile = await db
      .collection('users')
      .where('userName', '==', username)
      .get();
    return (
      profile.docs.length > 0 && profile.docs[0].id !== auth.currentUser?.uid
    );
  };

  const uploadImage = (file: File, location: string = 'images') => {
    const fileRef = storageRef.child(`${location}/${file.name}`);
    return fileRef.put(file).then((snapshot) => {
      return snapshot.ref.getDownloadURL();
    });
  };

  const saveUser = async (user: Types.userProfile) => {
    const userRef = db.collection('users').doc(auth.currentUser?.uid);
    return userRef.update(user!);
  };

  const watchConnections = (
    uid: string,
    // eslint-disable-next-line no-unused-vars
    callback: Dispatch<SetStateAction<Types.connectionCounter>>
  ) => {
    db.collection('users')
      .doc(uid)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (data) {
          callback((prev) => ({ ...prev, followings: data.followings }));
        }
      });
    db.collection('users')
      .where('followings', 'array-contains', uid)
      .onSnapshot((doc) => {
        // console.log({ foll: doc.docs.map((d) => d.id) });
        callback((prev) => ({ ...prev, followers: doc.docs.map((d) => d.id) }));
      });
  };

  return {
    renderUi,
    signOut,
    onAuthStateChanged,
    getProfile,
    getProfileByUsername,
    uploadImage,
    saveUser,
    getCurrentUser,
    isUsernameExist,
    watchConnections,
  };
})();

export default $firebase;
