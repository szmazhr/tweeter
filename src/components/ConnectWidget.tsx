import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $firebase from '../apis/firebase';
import { LoggedInUser } from '../contexts/index.c';
import Types from '../types/index.t';
import { getRandom } from '../utils/utils';
import styles from './ConnectWidget.module.css';
import No from './No';
import UserList from './UserList';

function ConnectWidget({ title }: { title: string }) {
  const loggedInUser = useContext(LoggedInUser);
  const [allUid, setAllUid] = useState<Types.userProfileLocal['id'][] | null>(
    null
  );
  const [randomThree, setRandomThree] = useState<string[] | null>(null);

  useEffect(() => {
    if (allUid) {
      const include = ['YkSV1g5kHoYMul2oetfFwARXGuZ2'];
      const exclude = loggedInUser
        ? [loggedInUser.id, ...loggedInUser.followings]
        : [];
      setRandomThree(getRandom(allUid, 3, include, exclude, false));
    }
  }, [allUid]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    $firebase.getIndex('uids').then(setAllUid).catch(console.error);
  }, []);
  return (
    <section className={styles.widget}>
      <header className={styles.title}>
        <h3>{title}</h3>
      </header>
      <UserList
        ids={randomThree}
        followBtn
        type="min"
        onEmpty={
          <No
            heading="You are connected to All"
            text="When there will be anyone whom you are not connected with, will show up here"
          />
        }
      />
      <Link className={styles.more} to="/connect_people">
        Show more
      </Link>
    </section>
  );
}
export default ConnectWidget;
