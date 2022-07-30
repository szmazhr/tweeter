import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UserCoverImage from './UserCoverImage';
import styles from './ProfileCore.module.css';
import UserImage from './UserImage';
import UserName from './UserName';
import UserUserName from './UserUserName';
import Btn from './Btn';
import Types from '../types/index.t';
import { LoggedInUser } from '../contexts/index.c';
import PopUp from './PopUp';
import EditProfile from './EditProfile';
import $firebase from '../apis/firebase';
import Loading from './Loading';
import { getMonthName } from '../utils/utils';
import FollowBtn from './FollowBtn';

type ProfileCoreProps = {
  type?: 'min' | 'default' | 'full';
  user: Types.userProfileLocal | null;
  url?: Types.userProfileLocal['userName'];
  connections: Types.connections;
};

function ProfileCore({ type, user, url, connections }: ProfileCoreProps) {
  const loggedInUser = useContext(LoggedInUser);

  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [draft, setDraft] = useState<Types.userDraft | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  const [joinDate, setJoinDate] = useState(new Date());
  const navigate = useNavigate();

  const saveUser = () => {
    if (draft) {
      setIsSaving(true);
      $firebase
        .saveUser(draft as Types.userDraft)
        .then(() => {
          setIsEdited(false);
          setIsSaving(false);
          setEditProfile(false);
          navigate(`/${draft?.userName}`);
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (user?.createdAt) {
      setJoinDate(user.createdAt.toDate());
      if (!user.userName) {
        setIsNewUser(true);
      } else {
        setIsNewUser(false);
      }
    }
  }, [user]);

  useEffect(() => {
    if (isNewUser) {
      setEditProfile(true);
    }
  }, [isNewUser]);

  return (
    <>
      <UserCoverImage className={styles.coverImg} imgUrl={user?.coverURL} />
      <div className={styles.personalInfo}>
        <div className={styles.rowSB}>
          <div className={styles.avatar}>
            <UserImage imgUrl={user?.photoURL} className={styles.userImage} />
          </div>
          {!!user &&
            (user.userName === loggedInUser?.userName ? (
              <Btn
                label="Edit profile"
                btnStyle="light"
                className={styles.action}
                onClick={() => setEditProfile(true)}
              />
            ) : (
              <FollowBtn uid={user.id} />
            ))}
        </div>
        <div className={styles.nameRow}>
          <div className={styles.name}>
            {user ? <UserName user={user} verified /> : <span>@{url}</span>}
          </div>
          {!!user && (
            <div className={styles.userName}>
              <UserUserName username={user?.userName} />
            </div>
          )}
        </div>
        {!!user && type !== 'min' ? (
          <p className={styles.bio}>{user.bio}</p>
        ) : (
          ''
        )}

        {!!user && type === 'full' ? (
          <div className={styles.otherInfo}>
            {!!user.location && (
              <p>
                <i className="bi bi-geo-alt" />
                <span>{user.location}</span>
              </p>
            )}
            <p>
              <i className="bi bi-calendar3" />
              <span>
                {`Joined ${getMonthName(joinDate.getMonth())} 
                ${joinDate.getFullYear()}`}
              </span>
            </p>
          </div>
        ) : (
          ''
        )}
        {!!user && (
          <div className={styles.contacts}>
            <Link to={`/${url}/following`}>
              <span className={styles.count}>
                {connections.following.length}
              </span>
              <span>Followings </span>
            </Link>
            <Link to={`/${url}/followers`}>
              <span className={styles.count}>
                {connections.followers.length}
              </span>
              <span>Followers</span>
            </Link>
          </div>
        )}
        {!user && (
          <div className={styles.invalidUser}>
            <h2>This account doesn&#039;t exist</h2>
            <p>Try searching for another.</p>
          </div>
        )}
      </div>
      {editProfile && loggedInUser && (
        <PopUp
          title={isNewUser ? 'Create Account' : 'Edit profile'}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(!!isEdited && {
            onAction: saveUser,
            actionBtn: 'Save',
          })}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(!!loggedInUser?.name &&
            !isNewUser && {
              backBtn: true,
              backBtnClickHandler: () => setEditProfile(false),
            })}
        >
          <EditProfile
            user={loggedInUser}
            edited={setIsEdited}
            setDraft={setDraft}
          />
          {isSaving && (
            <div className={styles.saving}>
              <Loading />
            </div>
          )}
        </PopUp>
      )}
    </>
  );
}
export default ProfileCore;

ProfileCore.defaultProps = {
  type: 'default',
  url: '',
};
