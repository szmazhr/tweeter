import Types from '../types/index.t';
import Btn from './Btn';
import styles from './TopBar.module.css';

const isChrome = /Google Inc/.test(navigator.vendor);
function TopBar({
  backBtn,
  title,
  subTitle,
  actionBtn,
  backBtnClickHandler,
  onAction,
}: Types.TopBarProps) {
  return (
    <header
      className={` ${styles.topBar} ${
        isChrome ? styles.backdrop : styles.others
      }`}
    >
      {backBtn ? (
        <button
          type="button"
          className={styles.backBtn}
          onClick={backBtnClickHandler}
        >
          <i className="bi bi-arrow-left-short" data-icon="backBtn" />
        </button>
      ) : (
        ''
      )}
      <div className={styles.titles}>
        <span className={styles.title}>{title}</span>
        {subTitle ? <span className={styles.subTitle}>{subTitle}</span> : ''}
      </div>
      {onAction && actionBtn ? (
        <Btn
          label={actionBtn || 'Button'}
          onClick={onAction!}
          type="button"
          btnStyle="dark"
        />
      ) : (
        ''
      )}
    </header>
  );
}
export default TopBar;
