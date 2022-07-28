import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tweets from '../components/Tweets';
import { LoggedInUser } from '../contexts/index.c';

function Main() {
  const loggedInUser = useContext(LoggedInUser);
  const navigate = useNavigate();

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
      <Tweets />
      <section>sidebar right</section>
    </>
  );
}
export default Main;
