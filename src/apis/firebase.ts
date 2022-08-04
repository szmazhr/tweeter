import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import * as firebaseui from 'firebaseui';
import { Dispatch, SetStateAction } from 'react';
import Tweet from '../classes/Tweet';
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
        window.location.assign('/tweeter');
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

  const activeUser: {
    unSubscriber: () => void;
  } = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    unSubscriber: () => {},
  };

  const addUserToIndex = async (uid: Types.userProfileLocal['id']) => {
    const userRef = db.collection('explicitIndex').doc('users');
    userRef.update({
      uids: firebase.firestore.FieldValue.arrayUnion(uid),
    });
  };

  const getIndex = async (item: 'uids') => {
    const userRef = db.collection('explicitIndex').doc('users');
    const user = await userRef.get();
    const data = user.data();
    return data ? data[item] : [];
  };

  const addFollowing = async (uid: Types.userProfileLocal['id']) => {
    const currentUserId = auth.currentUser?.uid;
    if (currentUserId) {
      const userRef = db.collection('users').doc(currentUserId);
      userRef.update({
        followings: firebase.firestore.FieldValue.arrayUnion(uid),
      });
    }
  };

  const removeFollowing = async (uid: Types.userProfileLocal['id']) => {
    const currentUserId = auth.currentUser?.uid;
    if (currentUserId) {
      const userRef = db.collection('users').doc(currentUserId);
      userRef.update({
        followings: firebase.firestore.FieldValue.arrayRemove(uid),
      });
    }
  };

  // const transferImage = async (url: string) => {
  //   const res = await fetch(url, { mode: 'no-cors' });
  //   const blob = await res.blob();
  //   const ref = storageRef.child(
  //     `${auth.currentUser?.uid}/photo/${Date.now()},${blob.type}`
  //   );
  //   const snapshot = await ref.put(blob);
  //   return snapshot.ref.getDownloadURL();
  // };

  /**
   * function to watch for changes in the loggedIn user's profile
   * @param callback - callback function to be called when user is updated
   */
  const watchCurrentUser = (
    callback: Dispatch<
      SetStateAction<Types.userProfileLocal | undefined | null>
    >
  ) => {
    const uid = auth.currentUser?.uid;
    const userRef = db.collection('users').doc(uid);
    activeUser.unSubscriber();
    const unSubscriber = userRef.onSnapshot(async (doc) => {
      if (!doc.exists && uid) {
        addUserToIndex(uid);
        // const photoURL = auth.currentUser?.photoURL
        //   ? await transferImage(auth.currentUser.photoURL)
        //   : '';
        const newUser = new UserProfile({
          name: auth.currentUser?.displayName || '',
          photoURL: '',
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        } as Types.userProfile);
        userRef.set({ ...newUser });
      }
      callback({ ...doc.data(), id: doc.id } as Types.userProfileLocal);
    });
    activeUser.unSubscriber = unSubscriber;
  };

  // get Profile
  const getProfileByUid = async (
    uid: string | undefined = auth.currentUser?.uid
  ) => {
    const profile = await db.collection('users').doc(uid).get();
    return { ...profile.data(), id: profile.id } as Types.userProfileLocal;
  };

  /**
   * function to get the profile of user by their username
   * @param username - username of the user to be searched
   * @returns - user profile of the user with the given username if found else null
   */
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

  /**
   * function to get the profile of all the users
   * @returns - array of
   * this is hack is used to simulate the search
   */
  const getAllUsers = async () => {
    const users = await db.collection('users').get();
    return users.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as Types.userProfileLocal)
    );
  };

  /**
   * function to check if username is taken
   * @param username - username to be checked
   * @returns - true if username is taken else false
   */
  const isUsernameExist = async (username: string) => {
    const profile = await db
      .collection('users')
      .where('userName', '==', username)
      .get();
    return (
      profile.docs.length > 0 && profile.docs[0].id !== auth.currentUser?.uid
    );
  };

  /**
   * function to upload image to firebase storage
   * @param file - file to be uploaded
   * @param location - location to be uploaded to
   * @returns - url of the image uploaded
   */
  const uploadImage = async (file: File, location = 'images') => {
    const fileRef = storageRef.child(
      `${auth.currentUser?.uid}/${location}/${file.name}`
    );
    const snapshot = await fileRef.put(file);
    return snapshot.ref.getDownloadURL();
  };

  /**
   * function to update the profile of the loggedIn user
   * @param draft - object containing the updated profile details
   */
  const saveUser = async (draft: Types.userDraft) => {
    const userRef = db.collection('users').doc(auth.currentUser?.uid);
    return userRef.update(draft);
  };

  const activeConnections: {
    UnSubFollowers: () => void;
    UnSubFollowing: () => void;
  } = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    UnSubFollowers: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    UnSubFollowing: () => {},
  };

  /**
   * function to watch for changes in the loggedIn user's connections
   * calls unsubscribe on the previous subscription
   * @param uid - user id of the user to be watched
   * @param callback - callback function to be called when user is updated
   * save the unsubscribe function in the activeConnections object
   */
  const watchConnections = async (
    uid: string,
    callback: Dispatch<SetStateAction<Types.connections>>
  ) => {
    activeConnections.UnSubFollowers();
    activeConnections.UnSubFollowing();
    const followers = db
      .collection('users')
      .doc(uid)
      .onSnapshot((doc) => {
        const data = doc.data();
        if (data) {
          callback((prev) => {
            return { ...prev, following: data.followings };
          });
        }
      });
    const followings = db
      .collection('users')
      .where('followings', 'array-contains', uid)
      .onSnapshot((doc) => {
        callback((prev) => {
          return { ...prev, followers: doc.docs.map((d) => d.id) };
        });
      });
    activeConnections.UnSubFollowers = followers;
    activeConnections.UnSubFollowing = followings;
  };

  const getFollowersCount = async (uid: string) => {
    const followers = await db
      .collection('users')
      .where('followings', 'array-contains', uid)
      .get();
    return followers.size;
  };

  const postNewTweet = async (text: string) => {
    const uid = auth.currentUser?.uid;
    const tweet = new Tweet({
      text,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    } as Types.postData);
    db.collection(`users/${uid}/tweets`).add({ ...tweet });

    const userRef = db.collection('users').doc(uid);
    userRef.update({
      tweetCount: firebase.firestore.FieldValue.increment(1),
    });
  };

  const getAllTweets = async () => {
    const snapshot = await db
      .collectionGroup('tweets')
      .orderBy('createdAt', 'desc')
      .get();
    return Promise.all(
      snapshot.docs.map(async (doc) => {
        const res = await doc.ref.parent.parent?.get();
        const parent = {
          ...res?.data(),
          id: res?.id,
        } as Types.userProfileLocal;
        return {
          ...doc.data(),
          id: doc.id,
          author: parent,
        } as Types.postDataLocal;
      })
    );
  };

  const getTweetsByUid = async (uid: string) => {
    const snapshot = await db
      .collection(`users/${uid}/tweets`)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      } as Types.postDataLocal;
    });
  };

  const getTweetsByHashTag = async (hashTag: string) => {
    const snapshot = await db
      .collectionGroup('tweets')
      .where('hashTags', 'array-contains', `#${hashTag.toLocaleLowerCase()}`)
      .get();
    return Promise.all(
      snapshot.docs.map(async (doc) => {
        const res = await doc.ref.parent.parent?.get();
        const parent = {
          ...res?.data(),
          id: res?.id,
        } as Types.userProfileLocal;
        return {
          ...doc.data(),
          id: doc.id,
          author: parent,
        } as Types.postDataLocal;
      })
    );
  };

  const getUsersByUids = (docId: string[]) => {
    const users = docId.map(async (id) => {
      const doc = await db.collection('users').doc(id).get();
      return { ...doc.data(), id: doc.id } as Types.userProfileLocal;
    });
    return Promise.all(users);
  };

  return {
    onAuthStateChanged,
    renderUi,
    signOut,
    uploadImage,
    saveUser,
    addFollowing,
    watchCurrentUser,
    isUsernameExist,
    watchConnections,
    removeFollowing,
    getProfileByUid,
    getProfileByUsername,
    getAllTweets,
    getTweetsByUid,
    getTweetsByHashTag,
    getUser,
    getUsersByUids,
    getIndex,
    getAllUsers,
    getFollowersCount,
    postNewTweet,
  };
})();

export default $firebase;
