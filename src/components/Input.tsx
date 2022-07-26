/* eslint-disable no-unused-vars */
import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import styles from './Input.module.css';

/* eslint-disable no-unused-vars */
type InputProps = {
  label: string;
  value: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'date' | 'url' | 'textarea';
  onChange: (str: string) => void;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
  validate?:
    | [(value: string) => boolean | Promise<boolean>, string][]
    | undefined;
};

function Input({
  label,
  value,
  onChange,
  maxLength,
  required,
  minLength,
  type,
  validate,
}: InputProps) {
  const [charCount, setCharCount] = useState<number>(value.length);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) {
      return;
    }
    if (required && newValue.trim().length === 0) {
      setErrorMsg(`${label} can't be blank.`);
    } else if (minLength && newValue.length < minLength) {
      setErrorMsg(`${label} must be at least ${minLength} characters long.`);
    } else if (validate) {
      for (let i = 0; i < validate.length; i += 1) {
        const [validator, validateMessage] = validate[i];
        const result = validator(newValue);
        if (typeof result === 'boolean' && !result) {
          setErrorMsg(validateMessage);
          break;
        }
        if (typeof result === 'object') {
          result.then((isError) => {
            if (isError) {
              setErrorMsg(validateMessage);
            }
          });
          break;
        }
        setErrorMsg('');
      }

      // setErrorMsg(validateMessage || `${label} is invalid.`);/
    } else {
      setErrorMsg('');
    }

    onChange(newValue);
    setCharCount(newValue.length);
  };
  /*
  required: Field can't be blank
  minLength: Field must be at least X characters long
  validCharacters: Field must contain only characters from the set of X
  */

  return type === 'textarea' ? (
    <div
      className={`${styles.inputControl} ${!charCount && styles.isEmpty} ${
        !!errorMsg && styles.inValid
      }`}
    >
      <textarea
        rows={3}
        id={label.replace(/\s/g, '-').toLowerCase()}
        onChange={changeHandler}
        value={value}
      />
      <label
        className={styles.label}
        htmlFor={label.replace(/\s/g, '-').toLowerCase()}
      >
        {label}
      </label>
      {!!maxLength && (
        <span className={styles.counter}>
          {charCount}/{maxLength}
        </span>
      )}
      {!!errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
    </div>
  ) : (
    <div
      className={`${styles.inputControl} ${!charCount && styles.isEmpty} ${
        !!errorMsg && styles.inValid
      }`}
    >
      <input
        id={label.replace(/\s/g, '-').toLowerCase()}
        type={type}
        value={value}
        onChange={changeHandler}
      />
      <label
        className={styles.label}
        htmlFor={label.replace(/\s/g, '-').toLowerCase()}
      >
        {label}
      </label>
      {!!maxLength && (
        <span className={styles.counter}>
          {charCount}/{maxLength}
        </span>
      )}
      {!!errorMsg && <span className={styles.errorMsg}>{errorMsg}</span>}
    </div>
  );
}
export default Input;

Input.defaultProps = {
  maxLength: Infinity,
  minLength: 0,
  required: false,
  type: 'text',
  validate: () => true,
};
