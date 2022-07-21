import { useEffect } from 'react';
import logo from '../assets/logo.svg';
import FirebaseUi from '../components/FirebaseUi';
import MainFooter from '../components/MainFooter';
import styles from './Main.module.css';

function Main() {
  useEffect(() => {
    document.title = `Tweeter. It's what's happening`;
  }, []);
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

export default Main;
