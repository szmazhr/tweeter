import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { convertToSlug } from '../utils/utils';
import LogoImg from './LogoImg';
import styles from './Sidebar.module.css';
import SidebarOption from './SidebarOption';
import TweetBtn from './TweetBtn';
import UserImage from './UserImage';
import UserName from './UserName';
import UserUserName from './UserUserName';
import $firebase from '../apis/firebase';
import { UserProfile } from '../contexts/index.c';

const basicOptions = [
  {
    label: 'Home',
    iconA: 'house',
    iconB: 'house-fill',
  },
  {
    label: 'Explore',
    iconA: 'compass',
    iconB: 'compass-fill',
  },
  {
    label: 'Notifications',
    iconA: 'bell',
    iconB: 'bell-fill',
  },
  {
    label: 'Messages',
    iconA: 'envelope',
    iconB: 'envelope-fill',
  },
];

const initialState = {
  label: 'Profile',
  to: '/',
  iconA: 'person',
  iconB: 'person-fill',
};

// type sidebarRefType = {
//   current: HTMLDivElement;
// };

function Sidebar() {
  const [profileOption, setProfileOption] = useState(initialState);
  const sidebarRef = useRef<HTMLDivElement>(null)!;
  const user = useContext(UserProfile);

  const profileClickHandler = () => {
    sidebarRef.current!.toggleAttribute('data-toggle');
    console.log(sidebarRef);
  };

  useEffect(() => {
    setProfileOption((prev) => ({ ...prev, to: user?.userName! }));
  }, []);

  return (
    <div ref={sidebarRef}>
      <div className={styles.sidebarMobile} />
      <div className={styles.sidebar}>
        {/* twitter icon */}
        <div className={`${styles.options} ${!user ? styles.out : ''}`}>
          <div className={styles.sidebarItems}>
            <Link className={styles.logo} to="/">
              <LogoImg />
            </Link>
          </div>

          {/* Basic options */}
          {user ? (
            <>
              <nav className={`${styles.sidebarItems} ${styles.basicAction}`}>
                {basicOptions.map((option) => {
                  const slug = convertToSlug(option.label);
                  return (
                    <SidebarOption
                      key={slug}
                      option={{ ...option, to: slug }}
                    />
                  );
                })}
              </nav>
              {/* Profile option */}
              <div
                className={`${styles.sidebarItems} ${styles.userPageOption}`}
              >
                <SidebarOption option={profileOption} />
              </div>
              {/* Tweet Btn option */}
              <div className={`${styles.sidebarItems} ${styles.tweetBtn}`}>
                <TweetBtn type="sidebar" action="openEditor" />
              </div>
            </>
          ) : (
            <nav className={`${styles.sidebarItems} ${styles.basicAction}`}>
              {[basicOptions.find((option) => option.label === 'Explore')!].map(
                (option) => {
                  const slug = convertToSlug(option.label);
                  return (
                    <SidebarOption
                      key={slug}
                      option={{ ...option, to: slug }}
                    />
                  );
                }
              )}
            </nav>
          )}
        </div>
        {/* UserAction options */}
        {user ? (
          <div className={styles.profile}>
            <div
              className={styles.optionBoxBg}
              aria-hidden="true"
              onClick={profileClickHandler}
            />
            <div className={styles.optionBox}>
              <li>
                <button type="button" onClick={$firebase.signOut}>
                  <span>Log Out</span>
                  <UserUserName />
                </button>
              </li>
            </div>
            <button
              type="button"
              data-btnid="profileBtn"
              onClick={profileClickHandler}
            >
              <div className={styles.userAvatar}>
                <UserImage imgUrl={user.photoURL} />
              </div>
              <div className={styles.userInfo}>
                <UserName maxLength={15} />
                <UserUserName />
              </div>
              <div className={styles.action}>
                <i className="bi bi-three-dots" />
              </div>
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
export default Sidebar;
