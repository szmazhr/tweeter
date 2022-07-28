import firebase from 'firebase/compat/app';
import UserProfile from '../classes/UserProfile';

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Types {
  export type firebaseUser = firebase.User;
  export type timestamp = firebase.firestore.Timestamp;
  export type userProfile = UserProfile;
  export type userProfileLocal = userProfile & { id: firebaseUser['uid'] };
  export type connections = {
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

  export type postData = {
    id: string;
    author: string;
    parent: string;
    text: string;
    createdAt: firebase.firestore.Timestamp;
    media: string[];
    linkData: {
      title: string;
      url: string;
      description: string;
      image: string;
    };
    hashTag: string[];
    username?: string;
    name?: string;
    photoURL?: string;
    timeAgo?: string;
  };
}

export default Types;
