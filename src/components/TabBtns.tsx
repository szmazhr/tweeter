import { NavLink } from 'react-router-dom';
import styles from './TabBtns.module.css';

type TabBtnsProps = {
  links: {
    path?: string;
    label: string;
  }[];
};

function TabBtns({ links }: TabBtnsProps) {
  return (
    <nav className={styles.nav}>
      {links.map(({ path, label }) => (
        <NavLink
          key={path}
          className={({ isActive }) =>
            isActive ? `${styles.active} ${styles.navLink}` : styles.navLink
          }
          to={path ? `/${path}` : '/'}
        >
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
export default TabBtns;
