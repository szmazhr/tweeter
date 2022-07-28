import { NavLink } from 'react-router-dom';
import styles from './NavLinksUnderProfile.module.css';

const Links = [
  {
    path: '/',
    label: 'Tweets',
  },
  {
    path: '/with_replies',
    label: 'Tweets & replies',
  },
  {
    path: '/media',
    label: 'Media',
  },
  {
    path: '/likes',
    label: 'Likes',
  },
];

function NavLinksUnderProfile({ username }: { username: string }) {
  return (
    <nav className={styles.nav}>
      {Links.map(({ path, label }) => (
        <NavLink
          key={path}
          className={({ isActive }) =>
            isActive ? `${styles.active} ${styles.navLink}` : styles.navLink
          }
          to={`/${username}${path}`}
        >
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
export default NavLinksUnderProfile;
