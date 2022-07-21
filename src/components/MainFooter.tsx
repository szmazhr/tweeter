import { Link } from 'react-router-dom';
import styles from './MainFooter.module.css';

const footerOptions = [
  'About',
  'Terms of Service',
  'Privacy Policy',
  'Github',
  'Blog',
  'Settings',
];

function getLink(text: string) {
  return text.trim().replace(/\s/g, '-').toLowerCase();
}

function MainFooter() {
  const navLinks = footerOptions.map((option) => {
    const link = getLink(option);
    return (
      <Link key={link} to={`/${link}`}>
        {option}
      </Link>
    );
  });
  return (
    <nav className={styles.nav}>
      {navLinks} <div>&copy; Tweeter.</div>
    </nav>
  );
}
export default MainFooter;
