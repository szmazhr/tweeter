/* eslint-disable no-unused-vars */
import firebase from 'firebase/compat/app';

namespace Types {
  export type User = firebase.User | null | undefined;
  export type setUserCallback = (user: User) => void;
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
  };
}

export default Types;
