import { Link } from 'react-router-dom';
import styles from './LinkBtn.module.css';

function convertToSlug(Text: string) {
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

type LinkBtnProps = {
  label: string;
  to?: string;
  type?: 'primary' | 'dark' | 'light';
};

function LinkBtn({ to, label, type }: LinkBtnProps) {
  return (
    <Link className={styles[type || 'primary']} to={convertToSlug(to || label)}>
      {label}
    </Link>
  );
}
export default LinkBtn;

LinkBtn.defaultProps = {
  to: '',
  type: 'primary',
};
