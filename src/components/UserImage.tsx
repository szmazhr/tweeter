import { ReactNode } from 'react';
import styles from './UserImage.module.css';

type UserImageProps = {
  imgUrl?: string;
  className?: string;
  children?: ReactNode;
};

function UserImage({ imgUrl, className, children }: UserImageProps) {
  return (
    <div
      className={`${styles.userImg} ${className}`}
      style={imgUrl ? { backgroundImage: `url(${imgUrl})` } : {}}
    >
      {children}
    </div>
  );
}
export default UserImage;

UserImage.defaultProps = {
  imgUrl: '',
  className: '',
  children: null,
};
