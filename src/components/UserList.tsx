import { ReactNode, useEffect, useState } from 'react';
import $firebase from '../apis/firebase';
import Types from '../types/index.t';
import Loading from './Loading';
import UserCard from './UserCard';
import styles from './UserList.module.css';

type UserListProps = {
  ids: string[] | null;
  onEmpty?: ReactNode;
  followBtn?: boolean;
  type?: 'min' | 'default';
};

function UserList({ ids, onEmpty, followBtn, type }: UserListProps) {
  const [users, setUsers] = useState<Types.userProfileLocal[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (ids) {
      $firebase.getUsersByUids(ids).then(setUsers);
    }
  }, [ids]);

  return (
    <section className={styles.userList}>
      {!users ? <Loading /> : users.length === 0 && onEmpty}
      {users?.map((user) => (
        <UserCard key={user.id} user={user} type={type} followBtn={followBtn} />
      ))}
    </section>
  );
}
export default UserList;
