import UserCoverImage from './UserCoverImage';
import styles from './ProfileCore.module.css';
import UserImage from './UserImage';
import UserName from './UserName';
import UserUserName from './UserUserName';
import Btn from './Btn';

type InvalidUserProps = {
  username: string;
};

function InvalidUser({ username }: InvalidUserProps) {
  return (
    <>
      <UserCoverImage className={styles.coverImg} imgUrl="" />
      <div className={styles.personalInfo}>
        <div className={styles.rowSB}>
          <div className={styles.avatar}>
            <UserImage imgUrl="" />
          </div>
          <Btn
            label={username}
            btnStyle="light"
            className={styles.action}
            onClick={() => {}}
          />
        </div>
        <div className={styles.nameRow}>
          <div className={styles.name}>
            <UserName verified />
          </div>
          <div className={styles.userName}>
            <UserUserName />
          </div>
        </div>
      </div>
    </>
  );
}
export default InvalidUser;
