import styles from './No.module.css';

type NoProps = {
  heading: string;
  text: string;
};

function No({ heading, text }: NoProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>{heading}</h2>
      <span className={styles.text}>{text}</span>
    </div>
  );
}
export default No;
