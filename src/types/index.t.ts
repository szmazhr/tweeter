import firebase from 'firebase/compat/app';
import Tweet from '../classes/Tweet';
import UserProfile from '../classes/UserProfile';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Types {
  export type firebaseUser = firebase.User;
  export type timestamp = firebase.firestore.Timestamp;
  export type userProfile = UserProfile;
  export type userProfileLocal = userProfile & {
    id: firebaseUser['uid'];
    tweetCount: number;
  };
  export type connections = {
    id: userProfileLocal['id'];
    following: string[];
    followers: string[];
  };

  export type userDraft = {
    bio: string;
    coverURL: string;
    location: string;
    name: string;
    photoURL: string;
    userName: string;
  };

  export type postData = Tweet;

  export type postDataLocal = postData & {
    id: string;
    timeAgo?: string;
    author: userProfileLocal;
  };

  // export type postData = {
  //   id: string;
  //   author: userProfileLocal;
  //   text: string;
  //   createdAt: firebase.firestore.Timestamp;
  //   media: string[];
  //   linkData: {
  //     title: string;
  //     url: string;
  //     description: string;
  //     image: string;
  //   };
  //   hashTag: string[];
  //   timeAgo?: string;
  // };

  export type btnStyles =
    | 'primary'
    | 'dark'
    | 'light'
    | 'light-danger'
    | 'primary-disabled';

  // ---- Props Helper ------------------------------------------------------------------------------------------------------------------
  export type SidebarOption = {
    label: string;
    to: string;
    iconA: string;
    iconB: string;
  };
  //-------------------------------------------------------------------------------------------------------------------------------------------------
  // export type User = firebase.User | null | undefined;
  export type setUidCallback = (x: firebaseUser['uid']) => void;
  export type UserName = {
    userName?: string;
    verified?: boolean;
  };
  // export type userProfile =
  //   | {
  //       id: string;
  //       name: string;
  //       userName: string;
  //       bio: string;
  //       photoURL: string;
  //       coverURL: string;
  //       verified: boolean;
  //       followings: string[];
  //       location: string;
  //       join: {
  //         seconds: number;
  //         nanoseconds: number;
  //       };
  //     }
  //   | null
  //   | undefined;

  export type userAsProps = {
    user?: userProfile;
    verified?: boolean;
    maxLength?: number;
  };

  export type getTweetsProps = {
    uid?: string;
    hashTag?: string;
  };
}

export default Types;
