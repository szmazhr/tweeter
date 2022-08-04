import { ReactNode } from 'react';
import styles from './PopUp.module.css';
import TopBar from './TopBar';

type PopUpProps = {
  children: ReactNode;
  title: ReactNode;
  backBtnClickHandler?: () => void;
  actionBtn?: string;
  onAction?: () => void;
  className?: string;
};

function PopUp({
  children,
  title,
  backBtnClickHandler,
  actionBtn,
  onAction,
  className,
}: PopUpProps) {
  return (
    <section className={styles.container}>
      <div className={`${styles.box} ${className}`}>
        <TopBar
          title={title}
          backBtnClickHandler={backBtnClickHandler}
          actionBtn={actionBtn}
          onAction={onAction}
        />
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
export default PopUp;
