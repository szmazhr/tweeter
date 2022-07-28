/* eslint-disable import/prefer-default-export */
import { createContext } from 'react';
import Types from '../types/index.t';

const LoggedInUser = createContext<Types.userProfileLocal | null>(null);

export { LoggedInUser };
