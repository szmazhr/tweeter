import styles from './Loading.module.css';
import LogoImg from './LogoImg';

type LoadingProps = {
  size?: 'large' | 'default';
};

function Loading({ size }: LoadingProps) {
  return (
    <div className={`${styles.container} ${size && styles[size]} `}>
      <div className={styles.circle}>
        <LogoImg />
      </div>
    </div>
  );
}
export default Loading;
