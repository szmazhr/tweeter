import styles from './TopBar.module.css';

type TopBarProps = {
  title: string;
  backBtn: boolean;
  subTitle?: string;
};

const isChrome = /Google Inc/.test(navigator.vendor);
function TopBar({ backBtn, title, subTitle }: TopBarProps) {
  return (
    <div
      className={` ${styles.topBar} ${
        isChrome ? styles.backdrop : styles.others
      }`}
    >
      {backBtn ? (
        <button type="button">
          <i className="bi bi-arrow-left-short" />
        </button>
      ) : (
        ''
      )}
      <div className={styles.titles}>
        <span className={styles.title}>{title}</span>
        {subTitle ? <span className={styles.subTitle}>{subTitle}</span> : ''}
      </div>
    </div>
  );
}
export default TopBar;

TopBar.defaultProps = {
  subTitle: '',
};
