import { useEffect, useState } from 'react';
import styles from './UserImage.module.css';

type UserImageProps = {
  userName: string;
};

function UserImage({ userName }: UserImageProps) {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    console.log(userName);
    setImgSrc(
      'https://pbs.twimg.com/profile_images/1186525039186677760/Mrux6rv5_x96.jpg'
    );
  }, []);

  return <img className={styles.userImg} src={imgSrc} alt="" />;
}
export default UserImage;
