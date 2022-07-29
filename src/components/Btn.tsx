import { MouseEvent, useState } from 'react';
import Types from '../types/index.t';
import styles from './Btn.module.css';

type BtnProps = {
  label: string;
  btnStyle?: Types.btnStyles;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  alt?: string;
};

function Btn({ className, label, type, btnStyle, onClick, alt }: BtnProps) {
  const [isHover, setIsHover] = useState(false);
  const clickHandler = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onClick();
    return e;
  };
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type || 'button'}
      className={`${className || ''} ${styles.action} ${
        styles[btnStyle || 'primary']
      }`}
      onClick={clickHandler}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
    >
      {/* separate element just because of fixed width */}
      <span className={styles.label}>{label}</span>
      <span className={styles['alt-label']}>
        {/danger/i.test(btnStyle || '') && isHover ? alt : label}
      </span>
    </button>
  );
}
export default Btn;
