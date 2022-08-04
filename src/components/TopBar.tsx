import { ReactNode } from 'react';
import Btn from './Btn';
import styles from './TopBar.module.css';

type TopBarProps = {
  title: ReactNode;
  backBtnClickHandler?: () => void;
  backBtn?: ReactNode;
  subTitle?: string;
  actionBtn?: string;
  onAction?: () => void;
};

const isChrome = /Google Inc/.test(navigator.vendor);
function TopBar({
  title,
  subTitle,
  actionBtn,
  backBtn,
  backBtnClickHandler,
  onAction,
}: TopBarProps) {
  return (
    <header
      className={` ${styles.topBar} ${
        isChrome ? styles.backdrop : styles.others
      }`}
    >
      {backBtnClickHandler
        ? backBtn || (
            <button
              type="button"
              className={styles.backBtn}
              onClick={backBtnClickHandler}
            >
              <i className="bi bi-arrow-left-short" data-icon="backBtn" />
            </button>
          )
        : ''}
      <div className={styles.titles}>
        <span className={styles.title}>{title}</span>
        {subTitle ? <span className={styles.subTitle}>{subTitle}</span> : ''}
      </div>
      {onAction && actionBtn ? (
        <Btn
          label={actionBtn || 'Button'}
          onClick={onAction}
          type="submit"
          btnStyle="dark"
        />
      ) : (
        ''
      )}
    </header>
  );
}
export default TopBar;
