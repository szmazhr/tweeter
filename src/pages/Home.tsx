import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserProfile } from '../contexts/index.c';

function Main() {
  const user = useContext(UserProfile);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = `Home / Tweeter`;
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

  return <span>{location.pathname}</span>;
}
export default Main;
