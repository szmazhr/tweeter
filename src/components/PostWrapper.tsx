import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $firebase from '../apis/firebase';
import { LoggedInUser } from '../contexts/index.c';
import Types from '../types/index.t';
import { timeAgo } from '../utils/utils';
import IconBtn from './IconBtn';
import PostImages from './PostImages';
import PostText from './PostText';
import styles from './PostWrapper.module.css';
import UserImage from './UserImage';
import UserName from './UserName';
import UserUserName from './UserUserName';

function PostWrapper({ postData }: { postData: Types.postDataLocal }) {
  const [post, setPost] = useState(postData);
  const loggedInUser = useContext(LoggedInUser);
  const [isLiking, setIsLiking] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const likeClickHandler = () => {
    if (loggedInUser?.likes?.includes(post.id)) {
      $firebase.removeLikes(post.id);
    } else {
      $firebase.addLikes(post.id);
    }
  };

  useEffect(() => {
    setPost((_post) => ({
      ..._post,
      timeAgo: timeAgo(post.createdAt),
    }));
  }, []);

  useEffect(() => {
    const unSub = $firebase.watchLikes(post.id, setLikeCount);
    return () => unSub();
  }, []);

  useEffect(() => {
    if (loggedInUser?.likes?.includes(post.id)) {
      setIsLiking(true);
    } else {
      setIsLiking(false);
    }
  }, [loggedInUser]);

  return (
    // <div>Post Wrapper</div>
    <article className={styles.postContainer}>
      <div className={styles.row_top}>
        <div className={styles.col_left}>
          <div className={styles.avatar}>
            <UserImage imgUrl={post.author.photoURL} />
          </div>
        </div>
        <div className={styles.col_right}>
          <div className={styles.postHeader}>
            <div className={styles.postHeaderInfo}>
              <Link to={`/${post.author.userName}`} className={styles.name}>
                <UserName user={post.author} verified />
              </Link>
              <Link to={`/${post.author.userName}`} className={styles.username}>
                <UserUserName username={post.author.userName} />
              </Link>
              <span className={styles.time}>{post.timeAgo}</span>
            </div>
          </div>
          <div className={styles.postBody}>
            <PostText className={styles.text} text={post.text} />
            <PostImages className={styles.media} media={post.media} />
          </div>
        </div>
      </div>
      <div className={`${styles.row_bottom}`}>
        <IconBtn icon="chat" label="Reply" onClick={() => undefined} />
        <IconBtn
          icon="arrow-repeat"
          label="Retweet"
          onClick={() => undefined}
          color="#00ba7c"
        />
        <IconBtn
          icon={isLiking ? 'heart-fill' : 'heart'}
          active={isLiking}
          label="Like"
          color="#f91880"
          onClick={likeClickHandler}
          counter={likeCount}
        />
        <IconBtn icon="upload" label="Share" onClick={() => undefined} />
      </div>
    </article>
  );
}
export default PostWrapper;
