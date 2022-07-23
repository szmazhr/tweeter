import UserCoverImage from './UserCoverImage';
import styles from './ProfileCore.module.css';
import UserImage from './UserImage';
import UserName from './UserName';
import UserUserName from './UserUserName';

type ProfileCoreProps = {
  type?: 'min' | 'default' | 'full';
};

function ProfileCore({ type }: ProfileCoreProps) {
  return (
    <>
      <UserCoverImage className={styles.coverImg} userName="cover" />
      <div className={styles.personalInfo}>
        <div className={styles.rowSB}>
          <div className={styles.avatar}>
            <UserImage userName="profileCore" />
          </div>
          <button
            className={`${styles.action} ${styles.actionEdit}`}
            type="button"
          >
            Edit Profile
          </button>
        </div>
        <div className={styles.nameRow}>
          <div className={styles.name}>
            <UserName />
          </div>
          <div className={styles.userName}>
            <UserUserName />
          </div>
        </div>
        {type !== 'min' ? (
          <p className={styles.bio}>
            Designer, Developer, Dreaner, Developer, Dreaner, Developer,
            Dreaner, Developer, Dreaner, Developer, Dreamer
          </p>
        ) : (
          ''
        )}
        {type === 'full' ? (
          <div className={styles.otherInfo}>
            <p>
              <i className="bi bi-geo-alt" />
              <span>Kanpur, India </span>
            </p>
            <p>
              <i className="bi bi-calendar3" />
              <span>Joined August 3022</span>
            </p>
          </div>
        ) : (
          ''
        )}

        <div className={styles.contacts}>
          <p>
            <span className={styles.count}>9</span>
            <span>Followings </span>
          </p>
          <p>
            <span className={styles.count}>7786031707</span>
            <span>Followers</span>
          </p>
        </div>
      </div>
    </>
  );
}
export default ProfileCore;

ProfileCore.defaultProps = {
  type: 'default',
};
