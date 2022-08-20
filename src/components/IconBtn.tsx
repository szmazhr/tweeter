import { useEffect, useRef, useState } from 'react';
import styles from './IconBtn.module.css';

type IconBtnProps = {
  icon: string;
  counter?: number;
  label?: string;
  onClick: () => void;
  color?: string;
  btnStyle?: 'editor' | 'editor-disabled' | '';
  active?: boolean;
};

function IconBtn({
  icon,
  onClick,
  color,
  label,
  counter,
  active,
  btnStyle = '',
}: IconBtnProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isHover, setIsHover] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (btnRef.current) {
      if (color && isHover) {
        btnRef.current.style.color = color;
      } else {
        btnRef.current.removeAttribute('style');
      }
      if (counterRef.current) {
        if (color && isHover) {
          counterRef.current.style.color = color;
        } else {
          counterRef.current.removeAttribute('style');
        }
      }
    }
  }, [isHover]);

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <button
        className={`${styles.btn} ${btnStyle ? styles[btnStyle] : ''}`}
        type="button"
        onClick={!/disabled/.test(btnStyle) ? onClick : undefined}
        data-title={label}
        ref={btnRef}
      >
        <span
          className={styles.hover_effect}
          style={{
            background: `linear-gradient(rgba(255, 255, 255, .9), rgba(255, 255, 255, .9)), linear-gradient(${color}, ${color})`,
          }}
        />
        <i
          className={`bi bi-${icon} ${styles.icon}`}
          style={active ? { color } : {}}
        />
      </button>
      {!!counter && (
        <span ref={counterRef} className={styles.counter}>
          {counter}
        </span>
      )}
    </div>
  );
}
export default IconBtn;
