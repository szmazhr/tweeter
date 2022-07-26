import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseUi from '../components/FirebaseUi';
import MainFooter from '../components/MainFooter';
import styles from './Login.module.css';
import { UserProfile } from '../contexts/index.c';
import LogoImg from '../components/LogoImg';

function Login() {
  const user = useContext(UserProfile);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Tweeter. It's what's happening`;
  }, []);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
    console.log(user);
  }, [user]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.action}>
          <div className={styles.logo} />
          <h1>Happening now</h1>
          <h3>Join Tweeter today.</h3>
          {user ? '' : <FirebaseUi />}
        </div>
        <div className={styles.thumbnail}>
          <LogoImg />
        </div>
      </div>
      <MainFooter />
    </>
  );
}
export default Login;
