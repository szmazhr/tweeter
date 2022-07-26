// import 'firebaseui/dist/firebaseui.css';
import './FirebaseUi.css';
import { useContext, useEffect } from 'react';
import $firebase from '../apis/firebase';
import { UserProfile } from '../contexts/index.c';

function FirebaseUi() {
  const user = useContext(UserProfile);

  useEffect(() => {
    if (!user) {
      $firebase.renderUi('#firebaseui-auth-container');
    }
  }, [user]);

  return <div id="firebaseui-auth-container" />;
}
export default FirebaseUi;
