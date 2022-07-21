/* eslint-disable no-unused-vars */
import firebase from 'firebase/compat/app';

namespace Types {
  export type User = firebase.User | null;
  export type setUserCallback = (user: User) => void;
}

export default Types;
