import { NavLink } from 'react-router-dom';
import Types from '../types/index.t';
import styles from './SidebarOption.module.css';

function SidebarOption({ option }: Types.SidebarOptionProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? `${styles.active} ${styles.navLink}` : styles.navLink
      }
      to={option.to}
    >
      <i className={`bi bi-${option.iconA} ${styles.active}`} />
      <i className={`bi bi-${option.iconB} ${styles.inActive}`} />
      <span>{option.label}</span>
    </NavLink>
  );
}
export default SidebarOption;
