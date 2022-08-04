import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Types from '../types/index.t';
import { timeAgo } from '../utils/utils';
import IconBtn from './IconBtn';
import PostText from './PostText';
import styles from './PostWrapper.module.css';
import UserImage from './UserImage';
import UserName from './UserName';
import UserUserName from './UserUserName';

function PostWrapper({ postData }: { postData: Types.postDataLocal }) {
  const [post, setPost] = useState(postData);

  useEffect(() => {
    setPost((_post) => ({
      ..._post,
      timeAgo: timeAgo(post.createdAt),
    }));
  }, []);

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
              <Link to={post.author.userName} className={styles.name}>
                <UserName user={post.author} verified />
              </Link>
              <Link to={post.author.userName} className={styles.username}>
                <UserUserName username={post.author.userName} />
              </Link>
              <span className={styles.time}>{post.timeAgo}</span>
            </div>
          </div>
          <div className={styles.postBody}>
            <PostText className={styles.text} text={post.text} />
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
          icon="heart"
          label="Like"
          color="#f91880"
          onClick={() => undefined}
        />
        <IconBtn icon="upload" label="Share" onClick={() => undefined} />
      </div>
    </article>
  );
}
export default PostWrapper;
