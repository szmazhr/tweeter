import styles from './Btn.module.css';

type BtnProps = {
  label: string;
  btnStyle?: 'primary' | 'dark' | 'light';
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};

function Btn({ className, label, type, btnStyle, onClick }: BtnProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`${className} ${styles.action} ${styles[btnStyle!]}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
export default Btn;

Btn.defaultProps = {
  btnStyle: 'primary',
  type: 'button',
  className: '',
};
