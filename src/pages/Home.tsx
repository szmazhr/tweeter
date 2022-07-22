import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import $firebase from '../apis/firebase';
import CurrentUser from '../contexts/index.c';

function Main() {
  const user = useContext(CurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return (
    <button type="button" onClick={$firebase.signOut}>
      SignOut
    </button>
  );
}
export default Main;
