import { createContext } from 'react';
import Types from '../types/index.t';

const FirebaseUser = createContext<Types.Uid>(undefined);
const UserProfile = createContext<Types.userProfile | null>(null);

export { FirebaseUser, UserProfile };
