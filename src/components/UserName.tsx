import Types from '../types/index.t';

function UserName({ userName }: Types.UserName) {
  console.log(userName);

  return <span>Shahzar Mazhar</span>;
}
export default UserName;
