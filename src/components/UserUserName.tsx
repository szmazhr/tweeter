import Types from '../types/index.t';

type UserProfileProps = {
  username: Types.userProfileLocal['userName'];
};

function UserUserName({ username }: UserProfileProps) {
  return <span>@{username}</span>;
}
export default UserUserName;
