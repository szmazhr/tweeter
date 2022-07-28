// import 'firebaseui/dist/firebaseui.css';
import './FirebaseUi.css';
import { useContext, useEffect } from 'react';
import $firebase from '../apis/firebase';
import { LoggedInUser } from '../contexts/index.c';

function FirebaseUi() {
  const loggedInUser = useContext(LoggedInUser);

  useEffect(() => {
    if (!loggedInUser) {
      $firebase.renderUi('#firebaseui-auth-container');
    }
  }, [loggedInUser]);

  // return <div id="firebaseui-auth-container" />;
  return <div id="firebaseui-auth-container" />;
}
export default FirebaseUi;
