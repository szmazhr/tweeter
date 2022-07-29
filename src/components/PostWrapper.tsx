/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import $firebase from '../apis/firebase';
import Types from '../types/index.t';
import { hasAllProperties, timeAgo } from '../utils/utils';
import styles from './PostWrapper.module.css';
import UserImage from './UserImage';

function PostWrapper({ postData }: { postData: Types.postData }) {
  const [post, setPost] = useState(postData);

  useEffect(() => {
    if (!hasAllProperties(post, 'userName', 'name', 'photoURL')) {
      $firebase
        .getProfileByUid(post.author)
        .then((user) => {
          if (user) {
            setPost((_post) => ({
              ..._post,
              name: user.name,
              username: user.userName,
              photoURL: user.photoURL,
            }));
          } else {
            throw new Error('User not found');
          }
        })
        .catch(console.error);
    }
  }, []);

  useEffect(() => {
    setPost((_post) => ({
      ..._post,
      timeAgo: timeAgo(post.createdAt),
    }));
    console.log(timeAgo(post.createdAt));
  }, []);

  return (
    <div>Post Wrapper</div>
    // <article className={styles.postContainer}>
    //   <div className={styles.postHeader}>
    //     <div className={styles.photoWrapper}>
    //       <UserImage imgUrl={post.photoURL} />
    //     </div>
    //     <div className={styles.postHeaderInfo}>
    //       <h3>{post.name}</h3>
    //       <h4>{post.username}</h4>
    //       <p>{post.timeAgo}</p>
    //     </div>
    //   </div>
    //   <div className={styles.postBody}>
    //     <p>{post.text}</p>
    //   </div>
    //   <div className={styles.postFooter}>
    //     <div className={styles.postFooterInfo} />
    //     <div className={styles.postFooterActions}>
    //       <p>Like</p>
    //       <p>Comment</p>
    //       <p>Share</p>
    //     </div>
    //   </div>
    // </article>
  );
}
export default PostWrapper;
