import Types from '../types/index.t';

type UserNameProps = {
  user: Types.userProfileLocal;
  verified?: boolean;
};

function UserName({ user, verified = false }: UserNameProps) {
  // const loggedInUser = useContext(LoggedInUser);
  // const name = user ? user.name : loggedInUser?.name;

  return (
    <>
      <span>{user.name}&nbsp;</span>
      {verified && user.verified ? (
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
