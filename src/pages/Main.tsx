import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Login from './Login';

function Main() {
  const location = useLocation();

  useEffect(() => {
    document.title = `Tweeter. It's what's happening`;
  }, []);
  return location.pathname !== '/' ? (
    <>
      {/* Sidebar */}
      <Outlet />
      {/* Widget */}
    </>
  ) : (
    <Login />
  );
}

export default Main;
