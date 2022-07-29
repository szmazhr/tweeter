import { ReactNode, useEffect, useState } from 'react';
import $firebase from '../apis/firebase';
import Types from '../types/index.t';
import Loading from './Loading';
import UserCard from './UserCard';
import styles from './UserList.module.css';

type UserListProps = {
  ids: string[];
  onEmpty?: ReactNode;
  followBtn?: boolean;
};

function UserList({ ids, onEmpty, followBtn }: UserListProps) {
  const [users, setUsers] = useState<Types.userProfileLocal[] | undefined>(
    undefined
  );

  useEffect(() => {
    $firebase.getUsersByUids(ids).then(setUsers);
  }, []);

  return (
    <section className={styles.userList}>
      {!users ? <Loading /> : users.length === 0 && onEmpty}
      {users?.map((user) => (
        <UserCard key={user.id} user={user} followBtn={followBtn} />
      ))}
    </section>
  );
}
export default UserList;
