import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import $firebase from './apis/firebase';
import Types from './types/index.t';
import GitHub from './pages/GitHub';
import Main from './pages/Main';
import PP from './pages/PP';
import TOS from './pages/TOS';
import CurrentUser from './contexts/index.c';
import Error404 from './pages/Error404';
import Home from './pages/Home';
import styles from './loading.module.css';
import LogoImg from './components/LogoImg';
import Profile from './pages/Profile';

function RouterSwitch() {
  const [user, setUser] = useState<Types.User>(undefined);
  const [loaded, setLoaded] = useState(false);

  // continuously check for user login status
  useEffect(() => {
    $firebase.onAuthStateChanged(setUser);
  }, []);

  // wait until it is confirm either user logged in or not
  useEffect(() => {
    if (!loaded && user !== undefined) {
      setLoaded(true);
    }
  }, [user]);

  return !loaded ? (
    <div className={styles.container}>
      <LogoImg />
    </div>
  ) : (
    <BrowserRouter>
      <CurrentUser.Provider value={user}>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/home" element={<Home />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/notifications" element={<Home />} />
            <Route path="/messages" element={<Home />} />
            <Route path="/szmazhr" element={<Profile />} />
          </Route>
          <Route path="/terms-of-service" element={<TOS />} />
          <Route path="/privacy-policy" element={<PP />} />
          <Route path="/github" element={<GitHub />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </CurrentUser.Provider>
    </BrowserRouter>
  );
}
export default RouterSwitch;
