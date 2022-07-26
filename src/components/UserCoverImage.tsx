// import { useEffect, useState } from 'react';
import { ReactNode } from 'react';
import styles from './UserCoverImage.module.css';

type UserCoverImageProps = {
  imgUrl?: string;
  className?: string;
  children?: ReactNode;
};

function UserCoverImage({ imgUrl, className, children }: UserCoverImageProps) {
  return (
    <div
      className={`${styles.userCoverImg} ${className}`}
      style={imgUrl ? { backgroundImage: `url(${imgUrl})` } : {}}
    >
      {children}
    </div>
  );
}
export default UserCoverImage;

UserCoverImage.defaultProps = {
  imgUrl: '',
  className: '',
  children: null,
};
