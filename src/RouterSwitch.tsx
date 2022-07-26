import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import $firebase from './apis/firebase';
import Types from './types/index.t';
import GitHub from './pages/GitHub';
import Main from './pages/Main';
import PP from './pages/PP';
import TOS from './pages/TOS';
import { UserProfile } from './contexts/index.c';
import Home from './pages/Home';
import styles from './loading.module.css';
import LogoImg from './components/LogoImg';
import Profile from './pages/Profile';

function RouterSwitch() {
  const [uid, setUid] = useState<Types.Uid | null>(undefined);
  const [user, setUser] = useState<Types.userProfile>(undefined);
  const [loaded, setLoaded] = useState(false);

  // continuously check for user login status
  useEffect(() => {
    $firebase.onAuthStateChanged(setUid);
  }, []);

  // wait for user to be loaded
  useEffect(() => {
    if (uid === undefined) return;
    if (uid) {
      $firebase.getCurrentUser(setUser);
    } else {
      setUser(null);
    }
  }, [uid]);

  // wait until it is confirm either user logged in or not
  useEffect(() => {
    /*
     * *----Possible states----*
     * 1. unknown login status (uid is undefined, user is null)
     * 2. user logged in (uid is defined but user is undefined -> not loaded yet)
     * 3. user logged in (uid is defined and user is defined -> loaded) // now we can render the app
     */

    if (!loaded && user !== undefined && uid !== undefined) {
      setLoaded(true);
    }
  }, [user]);

  return !loaded ? (
    <div className={styles.container}>
      <LogoImg />
    </div>
  ) : (
    <BrowserRouter>
      <UserProfile.Provider value={user}>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/notifications" element={<Home />} />
            <Route path="/messages" element={<Home />} />
            <Route path="/:username" element={<Profile />} />
          </Route>
          <Route path="/terms-of-service" element={<TOS />} />
          <Route path="/privacy-policy" element={<PP />} />
          <Route path="/github" element={<GitHub />} />
        </Routes>
      </UserProfile.Provider>
    </BrowserRouter>
  );
}
export default RouterSwitch;
