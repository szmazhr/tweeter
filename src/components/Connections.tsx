import { useLocation, useOutletContext, useParams } from 'react-router-dom';
import Types from '../types/index.t';
import No from './No';
import TabBtns from './TabBtns';
import UserList from './UserList';

const links = [
  {
    path: '/followers',
    label: 'Followers',
  },
  {
    path: '/following',
    label: 'Following',
  },
];

function Connections() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const connections = useOutletContext<Types.connections>();
  const { username } = useParams();
  const tabs = links.map((link) => ({
    path: `${username}${link.path}`,
    label: link.label,
  }));

  return (
    <>
      <TabBtns links={tabs} />
      {path === `/${username}/followers` && (
        <UserList
          ids={connections.followers}
          onEmpty={
            <No
              heading="Looking for followers?"
              text={`When someone follows this account, they'll show up here.`}
            />
          }
          followBtn
        />
      )}
      {path === `/${username}/following` && (
        <UserList
          ids={connections.following}
          onEmpty={
            <No
              heading={`@${username} isn't following anyone`}
              text={`Once they follow accounts, they'll show up here.`}
            />
          }
          followBtn
        />
      )}
    </>
  );
}
export default Connections;
