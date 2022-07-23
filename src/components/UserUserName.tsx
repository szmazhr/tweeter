import Types from '../types/index.t';

function UserUserName({ userName }: Types.UserName) {
  return <span>@{userName}</span>;
}
export default UserUserName;

UserUserName.defaultProps = {
  userName: 'szmazhr',
};
