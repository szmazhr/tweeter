import { createContext } from 'react';
import Types from '../types/index.t';

const CurrentUser = createContext<Types.User>(null);

export default CurrentUser;
