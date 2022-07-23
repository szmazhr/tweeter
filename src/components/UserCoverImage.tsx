import { useEffect, useState } from 'react';
import styles from './UserCoverImage.module.css';

type UserCoverImageProps = {
  userName: string;
  className: string;
};

function UserCoverImage({ userName, className }: UserCoverImageProps) {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    console.log(userName);
    setImgSrc(
      'https://pbs.twimg.com/profile_banners/1265060928/1402895323/1500x500'
    );
  }, []);

  return (
    <div
      className={`${styles.userCoverImg} ${className}`}
      style={{ backgroundImage: `url(${imgSrc})` }}
    />
  );
}
export default UserCoverImage;
