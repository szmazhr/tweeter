import { useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import $firebase from '../apis/firebase';
import Loading from '../components/Loading';
import NavLinksUnderProfile from '../components/NavLinksUnderProfile';
import ProfileCore from '../components/ProfileCore';
import TopBar from '../components/TopBar';
import UserName from '../components/UserName';
import { LoggedInUser } from '../contexts/index.c';
import Types from '../types/index.t';

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();

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
        {user === undefined ? (
          <>
            <TopBar title="Profile" backBtn />
            <Loading />
          </>
        ) : (
          <>
            <TopBar
              title={user?.name ? <UserName user={user} verified /> : 'Profile'}
              subTitle={user ? '0 tweet' : ''}
              backBtn
            />
            <ProfileCore user={user} url={username} type="full" />
            {!!user && !!username && (
              <>
                <NavLinksUnderProfile username={user.userName} />
                <Outlet context={user} />
              </>
            )}
          </>
        )}
      </main>
      <section>sidebar right</section>
    </>
  );
}
export default Profile;
