/* eslint-disable no-unused-vars */
import firebase from 'firebase/compat/app';
import { ReactNode } from 'react';

namespace Types {
  export type User = firebase.User | null | undefined;
  export type Uid = string | null | undefined;
  export type setUidCallback = (uid: Uid) => void;
  export type SidebarOptionProps = {
    option: {
      label: string;
      to: string;
      iconA: string;
      iconB: string;
    };
  };
  export type UserName = {
    userName?: string;
    verified?: boolean;
  };
  export type userProfile =
    | {
        id?: string;
        name?: string;
        userName?: string;
        bio?: string;
        photoURL?: string;
        coverURL?: string;
        verified?: boolean;
        followings?: string[];
        location?: string;
        join?: {
          seconds: number;
          nanoseconds: number;
        };
      }
    | null
    | undefined;
  // export type message = {
  //   message?: string;
  //   userName?: string;
  //   userId?: string;
  //   time?: string;
  //   photoURL?: string;
  //   verified?: boolean;
  //   type?: string;
  //   id?: string;
  //   read?: boolean;
  // };

  export type userAsProps = {
    user?: userProfile;
    verified?: boolean;
    maxLength?: number;
  };
  export type TopBarProps =
    | {
        title: ReactNode;
        backBtn?: boolean;
        backBtnClickHandler?: () => void;
        subTitle?: string;
        actionBtn?: undefined;
        onAction?: () => void;
      }
    | {
        title: ReactNode;
        backBtn?: boolean;
        subTitle?: string;
        backBtnClickHandler?: () => void;
        actionBtn: string;
        onAction: () => void;
      };

  export type PopUpProps =
    | {
        children: ReactNode;
        title: ReactNode;
        backBtn?: boolean;
        backBtnClickHandler?: () => void;
        actionBtn?: string;
        onAction?: () => void;
      }
    | {
        children: ReactNode;
        title: ReactNode;
        backBtn?: boolean;
        backBtnClickHandler?: () => void;
        actionBtn: string;
        onAction: () => void;
      };

  export type connectionCounter = {
    followers: string[];
    followings: string[];
  };
}

export default Types;
