import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
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
    tosUrl: '/terms-of-service',
    privacyPolicyUrl: '/privacy-policy',
  };

  // firebase ui render
  const renderUi = (container: string) => {
    ui.start(container, uiConfig);
  };

  // signing out
  const signOut = () => {
    firebase.auth().signOut();
  };

  // singing state observer
  const onAuthStateChanged = (callback: Types.setUserCallback) => {
    auth.onAuthStateChanged((_user) => {
      if (_user) {
        // User is signed in.
        callback(_user);
      } else {
        callback(null);
      }
    });
    return true;
  };

  return { renderUi, signOut, onAuthStateChanged };
})();

export default $firebase;
