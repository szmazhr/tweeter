import styles from './Loading.module.css';
import LogoImg from './LogoImg';

function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
        <LogoImg />
      </div>
    </div>
  );
}
export default Loading;
