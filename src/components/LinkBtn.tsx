import { Link } from 'react-router-dom';
import { convertToSlug } from '../utils/utils';
import styles from './LinkBtn.module.css';

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
