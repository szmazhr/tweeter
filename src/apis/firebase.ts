import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import * as firebaseui from 'firebaseui';
import { Dispatch, SetStateAction } from 'react';
import UserProfile from '../classes/UserProfile';
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
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
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

  // Auth state observer
  const onAuthStateChanged = (
    callback: Dispatch<SetStateAction<Types.firebaseUser | null | undefined>>
  ) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        callback(user);
      } else {
        callback(null);
      }
    });
    return true;
  };

  const getUser = async (uid: string) => {
    const userRef = db.collection('users').doc(uid);
    const user = await userRef.get();
    return { ...user.data(), id: user.id } as Types.userProfileLocal;
  };

  // get user data
  const watchCurrentUser = (
    callback: Dispatch<
      SetStateAction<Types.userProfileLocal | undefined | null>
    >
  ) => {
    const userRef = db.collection('users').doc(auth.currentUser?.uid);
    userRef.onSnapshot((doc) => {
      if (!doc.exists) {
        const newUser = new UserProfile({
          createdAt: firebase.firestore.Timestamp.now(),
        } as Types.userProfile);
        userRef.set({ ...newUser });
      }
      callback({ ...doc.data(), id: doc.id } as Types.userProfileLocal);
    });
  };

  // get Profile
  const getProfileByUid = async (
    uid: string | undefined = auth.currentUser?.uid
  ) => {
    const profile = await db.collection('users').doc(uid).get();
    return { ...profile.data(), id: profile.id } as Types.userProfileLocal;
  };

  const getProfileByUsername = async (username: string) => {
    const profile = await db
      .collection('users')
      .where('userName', '==', username)
      .get();
    return profile.docs.length > 0
      ? ({
          ...profile.docs[0].data(),
          id: profile.docs[0].id,
        } as Types.userProfileLocal)
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

  const uploadImage = async (file: File, location = 'images') => {
    const fileRef = storageRef.child(`${location}/${file.name}`);
    const snapshot = await fileRef.put(file);
    return snapshot.ref.getDownloadURL();
  };

  const saveUser = async (draft: Types.userDraft) => {
    const userRef = db.collection('users').doc(auth.currentUser?.uid);
    return userRef.update(draft);
  };

  const watchConnections = (
    uid: string,
    callback: Dispatch<SetStateAction<Types.connections>>
  ) => {
    db.collection('users')
      .doc(uid)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (data) {
          callback((prev) => ({ ...prev, following: data.followings }));
        }
      });
    db.collection('users')
      .where('followings', 'array-contains', uid)
      .onSnapshot((doc) => {
        // console.log({ foll: doc.docs.map((d) => d.id) });
        callback((prev) => ({ ...prev, followers: doc.docs.map((d) => d.id) }));
      });
  };

  const getAllTweets = () => {
    // eslint-disable-next-line no-console
    return db
      .collection('tweets')
      .get()
      .then((snapshot) => {
        return snapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            } as Types.postData)
        );
      });
  };

  const getTweetsByUid = (uid: string) => {
    return db
      .collection('tweets')
      .where('author', '==', uid)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Types.postData;
        });
      });
  };

  const getTweetsByHashTag = (hashTag: string) => {
    return db
      .collection('tweets')
      .where('hashTags', 'array-contains', hashTag)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            } as Types.postData)
        );
      });
  };

  const getUsersByUids = (docId: string[]) => {
    const users = docId.map(async (id) => {
      const doc = await db.collection('users').doc(id).get();
      return { ...doc.data(), id: doc.id } as Types.userProfileLocal;
    });
    return Promise.all(users);
  };

  return {
    renderUi,
    signOut,
    onAuthStateChanged,
    getProfileByUid,
    getProfileByUsername,
    uploadImage,
    saveUser,
    watchCurrentUser,
    isUsernameExist,
    watchConnections,
    getAllTweets,
    getTweetsByUid,
    getTweetsByHashTag,
    getUser,
    getUsersByUids,
  };
})();

export default $firebase;
