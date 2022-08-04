import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { isValidUsername } from '../utils/utils';
import Error404 from './Error404';
import Login from './Login';
import styles from './Main.module.css';

function Main() {
  const location = useLocation();
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (username && isValidUsername(username) && /[A-Z]/.test(username)) {
      const restUrl = location.pathname.split(/[\W]+/, 3)[2];
      navigate(`/${username.toLocaleLowerCase()}/${restUrl}/`);
    }
  }, []);

  return location.pathname !== '/' ? (
    <div className={styles.app}>
      {!!username && !isValidUsername(username) ? (
        <Error404 />
      ) : (
        <>
          <Sidebar className={styles.sidebar} />
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
