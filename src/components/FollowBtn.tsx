import { useContext, useEffect, useState } from 'react';
import $firebase from '../apis/firebase';
import { LoggedInUser } from '../contexts/index.c';
import Types from '../types/index.t';
import Btn from './Btn';

const buttons: {
  label: string;
  btnStyle: Types.btnStyles;
}[] = [
  {
    label: 'Follow',
    btnStyle: 'dark',
  },
  {
    label: 'Following',
    btnStyle: 'light-danger',
  },
];

function FollowBtn({ uid }: { uid: string }) {
  const [btnAttribute, setBtnAttribute] = useState<0 | 1>(0);
  const loggedInUser = useContext(LoggedInUser);

  const clickHandler = () => {
    if (loggedInUser && uid) {
      if (loggedInUser?.followings?.includes(uid)) {
        $firebase.saveUser({
          followings: loggedInUser.followings.filter((id) => id !== uid),
        } as Types.userProfile);
      } else {
        $firebase.saveUser({
          followings: [...loggedInUser.followings, uid] as string[],
        } as Types.userProfile);
      }
    }
  };

  useEffect(() => {
    // console.log({ user: user?.followings, loggedInUser: loggedInUser?.followings });
    if (uid !== loggedInUser?.id) {
      if (loggedInUser?.followings?.includes(uid)) {
        setBtnAttribute(1);
      } else {
        setBtnAttribute(0);
      }
    }
  }, [loggedInUser]);
  return (
    <Btn
      label={buttons[btnAttribute].label}
      btnStyle={buttons[btnAttribute].btnStyle}
      className=""
      onClick={clickHandler}
      alt="Unfollow"
    />
  );
}
export default FollowBtn;
