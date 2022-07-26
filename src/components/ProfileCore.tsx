import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UserCoverImage from './UserCoverImage';
import styles from './ProfileCore.module.css';
import UserImage from './UserImage';
import UserName from './UserName';
import UserUserName from './UserUserName';
import Btn from './Btn';
import Types from '../types/index.t';
import { UserProfile } from '../contexts/index.c';
import PopUp from './PopUp';
import EditProfile from './EditProfile';
import $firebase from '../apis/firebase';
import Loading from './Loading';

type ProfileCoreProps = {
  type?: 'min' | 'default' | 'full';
  user: Types.userProfile;
  url?: string;
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

type followBtnLabelType = 'Follow' | 'Unfollow' | 'Follow Back';

function ProfileCore({ type, user, url }: ProfileCoreProps) {
  const currentUser = useContext(UserProfile);
  const [joinDate, setJoinDate] = useState<Date>(new Date());
  const [followBtnLabel, setIsFollowBtnLabel] =
    useState<followBtnLabelType>('Follow');
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [draft, setDraft] = useState<Types.userProfile>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [connections, setConnections] = useState<Types.connectionCounter>({
    followers: [],
    followings: [],
  });
  const navigate = useNavigate();

  const followBtnClickHandler = () => {
    if (currentUser) {
      if (currentUser?.followings?.includes(user?.id!)) {
        $firebase.saveUser({
          followings: currentUser.followings.filter((id) => id !== user?.id),
        });
      } else {
        $firebase.saveUser({
          followings: [...currentUser!.followings!, user!.id] as string[],
        });
      }
    }
  };

  const saveUser = () => {
    setIsSaving(true);
    $firebase
      .saveUser(draft)
      .then(() => {
        setIsEdited(false);
        setIsSaving(false);
        setEditProfile(false);
        navigate(`/${draft!.userName}`);
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  useEffect(() => {
    // console.log({ user: user?.followings, currentUser: currentUser?.followings });
    if (!!user && !!currentUser && user.id !== currentUser?.id) {
      if (currentUser?.followings?.includes(user.id!)) {
        setIsFollowBtnLabel('Unfollow');
      } else if (connections.followings?.includes(currentUser?.id!)) {
        setIsFollowBtnLabel('Follow Back');
      } else {
        setIsFollowBtnLabel('Follow');
      }
    }
  }, [connections]);

  useEffect(() => {
    $firebase.watchConnections(user?.id!, setConnections);
    if (!!user && !!user.join) {
      setJoinDate(new Date(user.join.seconds! * 1000));
    }
  }, [user]);
  return (
    <>
      <UserCoverImage className={styles.coverImg} imgUrl={user?.coverURL} />
      <div className={styles.personalInfo}>
        <div className={styles.rowSB}>
          <div className={styles.avatar}>
            <UserImage imgUrl={user?.photoURL} className={styles.userImage} />
          </div>
          {!!user &&
            (user.userName === currentUser?.userName ? (
              <Btn
                label="Edit profile"
                btnStyle="light"
                className={styles.action}
                onClick={() => setEditProfile(true)}
              />
            ) : (
              <Btn
                label={followBtnLabel}
                btnStyle="dark"
                className={styles.action}
                onClick={followBtnClickHandler}
              />
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
            <p>
              <i className="bi bi-geo-alt" />
              <span>{user.location}</span>
            </p>
            <p>
              <i className="bi bi-calendar3" />
              <span>
                {`Joined ${monthNames[joinDate!.getMonth()]} 
                ${joinDate!.getFullYear()}`}
              </span>
            </p>
          </div>
        ) : (
          ''
        )}
        {!!user && (
          <div className={styles.contacts}>
            <Link to={`/${url}/followings`}>
              <span className={styles.count}>
                {connections.followings.length}
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
      {editProfile && (
        <PopUp
          title="Edit profile"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(!!isEdited && {
            onAction: saveUser,
            actionBtn: 'Save',
          })}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(!!currentUser?.name &&
            !!currentUser.userName && {
              backBtn: true,
              backBtnClickHandler: () => setEditProfile(false),
            })}
        >
          <EditProfile
            user={currentUser}
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
