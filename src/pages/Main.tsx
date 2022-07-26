import { Outlet, useLocation, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { isValidUsername } from '../utils/utils';
import Error404 from './Error404';
import Login from './Login';
import styles from './Main.module.css';

function Main() {
  const location = useLocation();
  const { username } = useParams();
  return location.pathname !== '/' ? (
    <div className={styles.app}>
      {!!username && !isValidUsername(username) ? (
        <Error404 />
      ) : (
        <>
          <Sidebar />
          <div className={styles.content}>
            <Outlet />
          </div>
        </>
      )}
    </div>
  ) : (
    <Login />
  );
}

export default Main;
