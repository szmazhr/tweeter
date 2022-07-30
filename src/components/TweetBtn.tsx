import { useEffect } from 'react';
import styles from './TweetBtn.module.css';

type TweetBtnProps = {
  type: 'sidebar';
  action: 'openEditor' | 'postTweet';
};

function TweetBtn({ type, action }: TweetBtnProps) {
  useEffect(() => {
    console.log(action);
  }, [type, action]);
  return (
    <button className={`${styles.tweetBtn} ${styles[type]}`} type="button">
      <i className="bi bi-pencil-square" />
      <span>Tweet</span>
    </button>
  );
}
export default TweetBtn;
