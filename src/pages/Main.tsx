import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Login from './Login';
import styles from './Main.module.css';

function Main() {
  const location = useLocation();
  return location.pathname !== '/' ? (
    <div className={styles.app}>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  ) : (
    <Login />
  );
}

export default Main;
