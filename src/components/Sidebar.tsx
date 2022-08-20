import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { convertToSlug } from '../utils/utils';
import LogoImg from './LogoImg';
import styles from './Sidebar.module.css';
import SidebarOption from './SidebarOption';
import UserImage from './UserImage';
import UserName from './UserName';
import UserUserName from './UserUserName';
import $firebase from '../apis/firebase';
import { LoggedInUser } from '../contexts/index.c';
import Types from '../types/index.t';
import PopUp from './PopUp';
import TweetBox from './TweetBox';

const basicOptions = [
  {
    label: 'Home',
    iconA: 'house',
    iconB: 'house-fill',
  },
  // {
  //   label: 'Explore',
  //   iconA: 'compass',
  //   iconB: 'compass-fill',
  // },
  // {
  //   label: 'Notifications',
  //   iconA: 'bell',
  //   iconB: 'bell-fill',
  // },
  // {
  //   label: 'Messages',
  //   iconA: 'envelope',
  //   iconB: 'envelope-fill',
  // },
];

const initialState = {
  label: 'Profile',
  to: '/profile',
  iconA: 'person',
  iconB: 'person-fill',
};

function Sidebar({ className }: { className?: string }) {
  const [profileOption, setProfileOption] = useState(initialState);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const loggedInUser = useContext(LoggedInUser);
  const [isTweeting, setIsTweeting] = useState(false);

  const profileClickHandler = () => {
    if (sidebarRef.current) {
      sidebarRef.current.toggleAttribute('data-toggle');
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      setProfileOption((prev) => ({
        ...prev,
        to: loggedInUser.userName || 'profile',
      }));
    }
  }, []);

  // useEffect(() => {
  //   // setInnerHtml(`<div style='color: red;'>${textarea}</div>`);
  //   setInnerHtml(textarea);
  // }, [textarea]);

  return (
    <div ref={sidebarRef} className={className}>
      <div className={styles.sidebarMobile} />
      <div className={styles.sidebar}>
        {/* twitter icon */}
        <div className={`${styles.options} ${!loggedInUser ? styles.out : ''}`}>
          <div className={styles.sidebarItems}>
            <Link className={styles.logo} to="/">
              <LogoImg />
            </Link>
          </div>

          {/* Basic options */}
          {loggedInUser ? (
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
                <button
                  className={styles.BtnOpenEditor}
                  type="button"
                  onClick={() => {
                    setIsTweeting(true);
                  }}
                >
                  <i className="bi bi-pencil-square" />
                  <span>Tweet</span>
                </button>
                {isTweeting && (
                  <PopUp
                    className={styles.tweetEditor}
                    title=""
                    backBtnClickHandler={() => setIsTweeting(false)}
                  >
                    <TweetBox
                      onSuccess={() => {
                        return null;
                      }}
                    />
                  </PopUp>
                )}
              </div>
            </>
          ) : (
            <nav className={`${styles.sidebarItems} ${styles.basicAction}`}>
              {[basicOptions.find((option) => option.label === 'Explore')].map(
                (option) => {
                  const slug = convertToSlug(option?.label || 'explore');
                  return (
                    <SidebarOption
                      key={slug}
                      option={{ ...option, to: slug } as Types.SidebarOption}
                    />
                  );
                }
              )}
            </nav>
          )}
        </div>
        {/* UserAction options */}
        {loggedInUser ? (
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
                  <UserUserName username={loggedInUser.userName || 'newUser'} />
                </button>
              </li>
            </div>
            <button
              type="button"
              data-btnid="profileBtn"
              onClick={profileClickHandler}
            >
              <div className={styles.userAvatar}>
                <UserImage imgUrl={loggedInUser.photoURL} />
              </div>
              <div className={styles.userInfo}>
                <UserName user={loggedInUser} />
                <UserUserName username={loggedInUser.userName || 'newUser'} />
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
