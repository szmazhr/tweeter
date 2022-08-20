import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ConnectWidget from '../components/ConnectWidget';
import Search from '../components/Search';
import TopBar from '../components/TopBar';
import TweetBox from '../components/TweetBox';
import Tweets from '../components/Tweets';
import { LoggedInUser } from '../contexts/index.c';

function Main() {
  const loggedInUser = useContext(LoggedInUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.title = `Home / Tweeter`;
  }, []);

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/');
    }
  }, [loggedInUser]);

  return (
    <>
      <div className="container">
        <TopBar title="Home" />
        {/^\/home\/?$/.test(location.pathname) && (
          <>
            <TweetBox
              onSuccess={() => {
                return null;
              }}
            />
            <hr
              style={{
                borderTop: '1px solid var(--muted-light)',
                borderBottom: 'none',
                margin: 0,
              }}
            />
          </>
        )}
        <Tweets />
      </div>
      <section className="right-sidebar">
        <Search />
        <ConnectWidget title="Who to follow" />
      </section>
    </>
  );
}
export default Main;
