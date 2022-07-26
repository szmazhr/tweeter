import { useContext } from 'react';
import { UserProfile } from '../contexts/index.c';

type UserUserNameProps = {
  username?: string;
};

function UserUserName({ username }: UserUserNameProps) {
  const currentUser = useContext(UserProfile);
  return <span>@{username || currentUser?.userName}</span>;
}
export default UserUserName;

UserUserName.defaultProps = {
  username: '',
};
