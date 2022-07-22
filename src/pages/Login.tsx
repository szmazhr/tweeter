import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseUi from '../components/FirebaseUi';
import MainFooter from '../components/MainFooter';
import logo from '../assets/logo.svg';
import styles from './Login.module.css';
import CurrentUser from '../contexts/index.c';

function Login() {
  const user = useContext(CurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.action}>
          <div className={styles.logo} />
          <h1>Happening now</h1>
          <h3>Join Tweeter today.</h3>
          <FirebaseUi />
        </div>
        <div className={styles.thumbnail}>
          <img src={logo} alt="" />
        </div>
      </div>
      <MainFooter />
    </>
  );
}
export default Login;
