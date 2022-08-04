/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import $firebase from '../apis/firebase';
import ConnectWidget from '../components/ConnectWidget';
import Search from '../components/Search';
import TopBar from '../components/TopBar';
import UserList from '../components/UserList';
import { LoggedInUser } from '../contexts/index.c';
import Types from '../types/index.t';
import { getRandom } from '../utils/utils';

function Connect() {
  const loggedInUser = useContext(LoggedInUser);
  const [allUid, setAllUid] = useState<Types.userProfileLocal['id'][] | null>(
    null
  );
  const [filteredUid, setFilteredUid] = useState<
    Types.userProfileLocal['id'][] | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (allUid) {
      const exclude = loggedInUser ? [loggedInUser.id] : [];
      setFilteredUid(getRandom(allUid, Infinity, [], exclude, true));
    }
  }, [allUid]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    $firebase.getIndex('uids').then(setAllUid).catch(console.error);
  }, []);

  return (
    <>
      <main>
        <TopBar title="Connect" backBtnClickHandler={() => navigate('/')} />
        <UserList ids={filteredUid} followBtn />
      </main>
      <section>
        <Search />
        <ConnectWidget title="You might like" />
      </section>
    </>
  );
}
export default Connect;
