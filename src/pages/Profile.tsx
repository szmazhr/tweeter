// import styles from './Profile.module.css';

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import $firebase from '../apis/firebase';
import Loading from '../components/Loading';
import ProfileCore from '../components/ProfileCore';
import TopBar from '../components/TopBar';
import UserName from '../components/UserName';
import { UserProfile } from '../contexts/index.c';
import Types from '../types/index.t';

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState<Types.userProfile>(undefined);
  const currentUser = useContext(UserProfile);
  // eslint-disable-next-line no-unused-vars

  useEffect(() => {
    // TODO: Move to respective files
    document.title = user
      ? `${user.name} (@${user.userName}) / Tweeter`
      : `Profile / Tweeter`;
  }, [user]);

  useEffect(() => {
    if (username) {
      $firebase.getProfileByUsername(username).then(setUser); // firebaseUser || null
    }
  }, [username, currentUser]);
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
              title={user ? <UserName user={user} verified /> : 'Profile'}
              subTitle={user ? '0 tweet' : ''}
              backBtn
            />
            <ProfileCore user={user} url={username} type="full" />
          </>
        )}
      </main>
      <section>sidebar right</section>
    </>
  );
}
export default Profile;
