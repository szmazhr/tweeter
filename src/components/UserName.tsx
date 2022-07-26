import { useContext } from 'react';
import { UserProfile } from '../contexts/index.c';
import Types from '../types/index.t';
import { excerpt } from '../utils/utils';

function UserName({ user, verified, maxLength }: Types.userAsProps) {
  const currentUser = useContext(UserProfile);
  const name = user ? user.name : currentUser!.name;

  return (
    <>
      <span>{maxLength ? excerpt(name!, maxLength) : name} </span>
      {verified && (user ? user.verified : currentUser?.verified) ? (
        <i
          data-title="Verified"
          className="bi bi-patch-check-fill"
          style={{ color: 'var(--primary-color)' }}
        />
      ) : (
        ''
      )}
    </>
  );
}
export default UserName;
