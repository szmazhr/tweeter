import { useContext } from 'react';
import LinkBtn from '../components/LinkBtn';
import { UserProfile } from '../contexts/index.c';
import styles from './Error404.module.css';

function Error404() {
  const user = useContext(UserProfile);

  return (
    <main className={styles.main}>
      <h1>Error404</h1>
      <p className={styles.text}>
        Hmm...this page doesn&#039;t exist(yet). Try again after sometime.
      </p>
      <p className={styles.or}>or</p>
      <LinkBtn to={user ? '/home' : '/'} label="Go Home" />
    </main>
  );
}
export default Error404;
