/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from 'react';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
import $firebase from '../apis/firebase';
import { LoggedInUser } from '../contexts/index.c';
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
  const [postsData, setPostsData] = useState<Types.postDataLocal[] | undefined>(
    undefined
  );
  const user = useOutletContext<Types.userProfileLocal>();
  const location = useLocation();
  const loggedInUser = useContext(LoggedInUser);

  const addUserDataToPost = (_postsData: Types.postDataLocal[]) => {
    if (user) {
      const newData = _postsData.map((post) => ({
        ...post,
        author: user,
      }));
      setPostsData(newData);
    }
  };

  useEffect(() => {
    /*
    ----Number of Ways Tweets can  be fetched----
    1. Get all tweets
    2. Get tweets by username / uid
    3. Get tweets by username / uid + likes
    4. Get tweets by hashtag
    */
    if (user) {
      if (
        location.pathname === `/${user.userName}/likes` ||
        location.pathname === `/${user.userName}/likes/`
      ) {
        if (user.likes.length > 0) {
          $firebase
            .getTweetsById(user.likes)
            .then(setPostsData)
            // eslint-disable-next-line no-console
            .catch(console.error);
        } else {
          setPostsData([]);
        }
      } else {
        $firebase
          .getTweetsByUid(user.id)
          .then(addUserDataToPost)
          // eslint-disable-next-line no-console
          .catch(console.error);
      }
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
  }, [user, location, loggedInUser?.tweetCount]);

  return (
    <main>
      {postsData &&
        postsData?.length > 0 &&
        postsData.map((post) => <PostWrapper key={post.id} postData={post} />)}
    </main>
  );
}
export default Tweets;
