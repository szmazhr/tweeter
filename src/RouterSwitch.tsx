import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import $firebase from './apis/firebase';
import Types from './types/index.t';
import GitHub from './pages/GitHub';
import Main from './pages/Main';
import PP from './pages/PP';
import TOS from './pages/TOS';
import CurrentUser from './contexts/index.c';

function RouterSwitch() {
  const [user, setUser] = useState<Types.User>(null);

  useEffect(() => {
    $firebase.onAuthStateChanged(setUser);
  }, []);

  return (
    <BrowserRouter>
      <CurrentUser.Provider value={user}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/terms-of-service" element={<TOS />} />
          <Route path="/privacy-policy" element={<PP />} />
          <Route path="/github" element={<GitHub />} />
        </Routes>
      </CurrentUser.Provider>
    </BrowserRouter>
  );
}
export default RouterSwitch;
