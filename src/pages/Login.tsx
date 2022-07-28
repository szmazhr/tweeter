import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FirebaseUi from '../components/FirebaseUi';
import MainFooter from '../components/MainFooter';
import styles from './Login.module.css';
import { LoggedInUser } from '../contexts/index.c';
import LogoImg from '../components/LogoImg';
import Loading from '../components/Loading';

/*
 * pathname: '/'
 */

function Login() {
  const loggedInUser = useContext(LoggedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `Tweeter. It's what's happening`;
  }, []);

  useEffect(() => {
    /*
     * If user is logged in, redirect to /home
     */
    if (loggedInUser && loggedInUser.userName && loggedInUser.name) {
      navigate('/home');
    } else if (loggedInUser && (!loggedInUser.userName || !loggedInUser.name)) {
      navigate('/profile');
    }
  }, [loggedInUser]);

  return (
    <>
      <div className={styles.container}>
        {loggedInUser ? (
          <Loading />
        ) : (
          <div className={styles.action}>
            <div className={styles.logo} />
            <h1>Happening now</h1>
            <h3>Join Tweeter today.</h3>
            <FirebaseUi />
          </div>
        )}
        <div className={styles.thumbnail}>
          <LogoImg />
        </div>
      </div>
      <MainFooter />
    </>
  );
}
export default Login;
