import { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import $firebase from '../apis/firebase';
import LinkBtn from '../components/LinkBtn';
import Loading from '../components/Loading';
import ProfileCore from '../components/ProfileCore';
import TabBtns from '../components/TabBtns';
import TopBar from '../components/TopBar';
import UserName from '../components/UserName';
import { LoggedInUser } from '../contexts/index.c';
import Types from '../types/index.t';
import styles from './Profile.module.css';

const links = [
  {
    path: '',
    label: 'Tweets',
  },
  {
    path: '/with_replies',
    label: 'Tweets & replies',
  },
  {
    path: '/media',
    label: 'Media',
  },
  {
    path: '/likes',
    label: 'Likes',
  },
];

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [connections, setConnections] = useState<Types.connections>({
    followers: [],
    following: [],
  });
  const pathNameLower = location.pathname.toLowerCase();
  const profileLinks = links.map((link) => ({
    path: `${username}${link.path}`,
    label: link.label,
  }));

  /**
   * undefined: initialState
   * null: user not found
   * user: user found
   */
  const [user, setUser] = useState<Types.userProfileLocal | undefined | null>(
    undefined
  );

  const loggedInUser = useContext(LoggedInUser);

  useEffect(() => {
    /**
     * Get the users connection.
     */
    if (user) {
      $firebase.watchConnections(user.id, setConnections);
    }
  }, [user]);

  useEffect(() => {
    /**
     * Set the page title based on userInfo.
     */
    document.title = user
      ? `${user.name} (@${user.userName}) / Tweeter`
      : `Profile / Tweeter`;
  }, [user]);

  useEffect(() => {
    if (username === 'profile') {
      if (loggedInUser) {
        $firebase.getProfileByUid(loggedInUser.id).then(setUser);
      } else {
        navigate('/');
      }
    } else if (username === loggedInUser?.userName) {
      setUser(loggedInUser);
    } else if (username) {
      /**
       * Get the user profile from the database.
       */
      $firebase.getProfileByUsername(username).then(setUser); // firebaseUser || null
    }
  }, [username, loggedInUser]);
  return (
    <>
      <main>
        {user === undefined && (
          <>
            <TopBar title="Profile" backBtn />
            <Loading />
          </>
        )}
        {user !== undefined &&
          (pathNameLower === `/${username}/following` ||
          pathNameLower === `/${username}/followers` ? (
            <>
              <TopBar
                title={user?.name ? <UserName user={user} verified /> : ''}
                subTitle={`@${username}`}
                backBtn
                backBtnClickHandler={() => navigate(`/${username}`)}
              />
              <Outlet context={connections} />
              {!user && (
                <div className={styles.errContainer}>
                  <div className={styles.errMsg}>
                    <p>Something went wrong...</p>
                    <LinkBtn label={`visit @${username}`} to={`/${username}`} />
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <TopBar
                title={
                  user?.name ? <UserName user={user} verified /> : 'Profile'
                }
                subTitle={user ? '0 tweet' : ''}
                backBtn
                backBtnClickHandler={() => navigate('/')}
              />
              <ProfileCore
                user={user}
                url={username}
                connections={connections}
                type="full"
              />
              {!!user && !!username && (
                <>
                  <TabBtns links={profileLinks} />
                  <Outlet context={user} />
                </>
              )}
            </>
          ))}
      </main>
      <section>sidebar right</section>
    </>
  );
}
export default Profile;
