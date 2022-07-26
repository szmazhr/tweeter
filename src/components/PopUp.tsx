import Types from '../types/index.t';
import styles from './PopUp.module.css';
import TopBar from './TopBar';

function PopUp({
  children,
  title,
  backBtn,
  backBtnClickHandler,
  actionBtn,
  onAction,
}: Types.PopUpProps) {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <TopBar
          title={title}
          backBtn={backBtn}
          backBtnClickHandler={backBtnClickHandler}
          actionBtn={actionBtn}
          onAction={onAction!}
        />
        <div className={styles.content}>{children}</div>
      </div>
    </section>
  );
}
export default PopUp;
