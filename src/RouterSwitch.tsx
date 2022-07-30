import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import $firebase from './apis/firebase';
import Types from './types/index.t';
import GitHub from './pages/GitHub';
import Main from './pages/Main';
import PP from './pages/PP';
import TOS from './pages/TOS';
import { LoggedInUser } from './contexts/index.c';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Error404 from './pages/Error404';
import Tweets from './components/Tweets';
import Connections from './components/Connections';
import Loading from './components/Loading';
import Connect from './pages/Connect';

function RouterSwitch() {
  const [firebaseUser, setSetFirebaseUser] = useState<
    Types.firebaseUser | null | undefined
  >(undefined);
  const [user, setUser] = useState<Types.userProfileLocal | undefined | null>(
    undefined
  );

  useEffect(() => {
    /*
     * *---- (Observe Logged in State & get Uid) ----*
     * This is the first time the app is loaded.
     * We need to get the user's uid from the firebase auth.
     * If the user is not logged in uid will be null.
     */
    // setSetFirebaseUser(undefined);
    $firebase.onAuthStateChanged(setSetFirebaseUser);
  }, []);

  useEffect(() => {
    //* stop if login state is not set
    if (firebaseUser === undefined) return;

    if (firebaseUser === null) {
      //* if user is not logged in, set user to null
      setUser(null);
      return;
    }
    if (firebaseUser) {
      /*
       * *---- logged in ----*
       * We need to get the user's profile from the firebase database.
       * If user is not in the database, we will create new account.
       * And watch for changes in the user's profile.
       * We then need to set the user's profile in the context.
       */
      $firebase.watchCurrentUser(setUser);
    }
  }, [firebaseUser]);

  return user === undefined ? (
    <div className="">
      {/* Wait, if login state is not set */}
      <Loading size="large" />
    </div>
  ) : (
    <BrowserRouter>
      <LoggedInUser.Provider value={user}>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/home" element={<Home />} />
            <Route path="/hashtag/:hashTag" element={<Home />} />
            <Route path="/explore" element={<Home />} />
            <Route path="/notifications" element={<Home />} />
            <Route path="/messages" element={<Home />} />
            <Route path="/connect_people" element={<Connect />} />
            <Route path="/:username" element={<Profile />}>
              <Route index element={<Tweets />} />
              <Route
                path="/:username/with_replies"
                element={<div>With Tweets</div>}
              />
              <Route path="/:username/media" element={<div>Media</div>} />
              <Route path="/:username/likes" element={<div>Likes</div>} />
              <Route path="/:username/followers" element={<Connections />} />
              <Route path="/:username/following" element={<Connections />} />
            </Route>
          </Route>
          <Route path="/terms-of-service" element={<TOS />} />
          <Route path="/privacy-policy" element={<PP />} />
          <Route path="/github" element={<GitHub />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </LoggedInUser.Provider>
    </BrowserRouter>
  );
}
export default RouterSwitch;
