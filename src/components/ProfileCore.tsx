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

type ProfileCoreProps = {
  type?: 'min' | 'default' | 'full';
  user: Types.userProfileLocal | null;
  url?: Types.userProfileLocal['userName'];
};

type FollowBtnLabelType = 'Follow' | 'Unfollow' | 'Follow Back';

function ProfileCore({ type, user, url }: ProfileCoreProps) {
  const loggedInUser = useContext(LoggedInUser);
  const [followBtnLabel, setIsFollowBtnLabel] =
    useState<FollowBtnLabelType>('Follow');
  const [editProfile, setEditProfile] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const [draft, setDraft] = useState<Types.userDraft | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isNewUser, setIsNewUser] = useState<boolean>(false);
  const [connections, setConnections] = useState<Types.connections>({
    followers: [],
    following: [],
  });
  const [joinDate, setJoinDate] = useState(new Date());
  const navigate = useNavigate();

  const followBtnClickHandler = () => {
    if (loggedInUser && user) {
      if (loggedInUser?.followings?.includes(user.id)) {
        $firebase.saveUser({
          followings: loggedInUser.followings.filter((id) => id !== user.id),
        } as Types.userProfile);
      } else {
        $firebase.saveUser({
          followings: [...loggedInUser.followings, user.id] as string[],
        } as Types.userProfile);
      }
    }
  };

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
    // console.log({ user: user?.followings, loggedInUser: loggedInUser?.followings });
    if (!!user && !!loggedInUser && user.id !== loggedInUser?.id) {
      if (loggedInUser?.followings?.includes(user.id)) {
        setIsFollowBtnLabel('Unfollow');
      } else if (connections.following?.includes(loggedInUser.id)) {
        setIsFollowBtnLabel('Follow Back');
      } else {
        setIsFollowBtnLabel('Follow');
      }
    }
  }, [connections]);

  useEffect(() => {
    if (user) {
      $firebase.watchConnections(user.id, setConnections);
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
            <Link to={`/${url}/followings`}>
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
