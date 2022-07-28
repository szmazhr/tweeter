import { useContext } from 'react';
import LinkBtn from '../components/LinkBtn';
import { LoggedInUser } from '../contexts/index.c';
import styles from './Error404.module.css';

function Error404() {
  const loggedInUser = useContext(LoggedInUser);

  return (
    <main className={styles.main}>
      <h1>Error404</h1>
      <p className={styles.text}>
        Hmm...this page doesn&#039;t exist(yet). Try again after sometime.
      </p>
      <p className={styles.or}>or</p>
      <LinkBtn to={loggedInUser ? '/home' : '/'} label="Go Home" />
    </main>
  );
}
export default Error404;
