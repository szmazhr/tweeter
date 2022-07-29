import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Types from '../types/index.t';
import FollowBtn from './FollowBtn';
import UserImage from './UserImage';
import UserName from './UserName';
import UserUserName from './UserUserName';
import styles from './UserCard.module.css';
import { LoggedInUser } from '../contexts/index.c';

// const $type = ['min', 'default', 'full'];

type UserCardProps = {
  user: Types.userProfileLocal;
  type?: 'min' | 'default' | 'full';
  followBtn?: boolean;
};

function UserCard({
  user,
  type = 'default',
  followBtn = false,
}: UserCardProps) {
  const loggedInUser = useContext(LoggedInUser);
  const navigate = useNavigate();
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <article
      className={styles.container}
      onClick={() => {
        navigate(`/${user.userName}`);
      }}
    >
      <div className={styles.avatar}>
        <UserImage imgUrl={user.photoURL} />
      </div>
      <div className={styles.textContent}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <Link to={`/${user.userName}`} className={styles.name}>
              <UserName user={user} verified />
            </Link>
            <div className={styles.username}>
              <UserUserName username={user.userName} />
            </div>
          </div>
          {followBtn && loggedInUser?.id !== user.id && (
            <div className={styles.button}>
              <FollowBtn uid={user.id} />
            </div>
          )}
        </div>
        {type === 'default' && <p className={styles.bio}>{user.bio}</p>}
      </div>
    </article>
  );
}
export default UserCard;
