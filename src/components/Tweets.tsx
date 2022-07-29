/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import $firebase from '../apis/firebase';
import Types from '../types/index.t';
import PostWrapper from './PostWrapper';

/*
 * If I do math, I should add the author's info to each tweet.
 * because I need to know the author's name, profile pic, and user name in each post.
 * I think firebase costs for each read and write.
 * (of course for this project no need to worry about costs thats why didn't searched about cost).
 * And reads will be always more than writes.
 * But need to update the author's info in the post if user updates his profile.
 * for now, leave it simple.
 */

function Tweets() {
  const { hashTag } = useParams();
  const [postsData, setPostsData] = useState<Types.postData[] | undefined>(
    undefined
  );
  const user = useOutletContext<Types.userProfileLocal>();

  const addUserDataToPost = (_postsData: Types.postData[]) => {
    if (user) {
      const { userName, name, photoURL } = user;
      const newData = _postsData.map((post) => ({
        ...post,
        userName,
        name,
        photoURL,
      }));
      setPostsData(newData);
    }
  };

  useEffect(() => {
    /*
    ----Number of Ways Tweets can  be fetched----
    1. Get all tweets
    2. Get tweets by username / uid
    3. Get tweets by hashtag
    */
    if (user) {
      $firebase
        .getTweetsByUid(user.id)
        .then(addUserDataToPost)
        // eslint-disable-next-line no-console
        .catch(console.error);
    } else if (hashTag) {
      $firebase
        .getTweetsByHashTag(hashTag)
        .then(setPostsData)
        // eslint-disable-next-line no-console
        .catch(console.error);
    } else {
      // eslint-disable-next-line no-console
      $firebase.getAllTweets().then(setPostsData).catch(console.error);
    }
  }, [user, hashTag]);

  return (
    <main>
      <div>Tweets</div>
      {/* {postsData?.length > 0 && <PostWrapper postData={postsData[0]} />} */}
    </main>
  );
}
export default Tweets;
