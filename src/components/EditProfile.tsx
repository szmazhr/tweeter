import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useReducer,
  useState,
} from 'react';
import $firebase from '../apis/firebase';
import Types from '../types/index.t';
import { isValidUsername } from '../utils/utils';
import styles from './EditProfile.module.css';
import Input from './Input';
import Loading from './Loading';
import UserCoverImage from './UserCoverImage';
import UserImage from './UserImage';

type EditProfileProps = {
  user: Types.userProfileLocal;
  edited: Dispatch<SetStateAction<boolean>>;
  setDraft: Dispatch<SetStateAction<Types.userDraft | null>>;
};

function reducer(
  state: Types.userDraft,
  action: { key: string; value: string }
) {
  return { ...state, [action.key]: action.value };
}

function EditProfile({ user, edited, setDraft }: EditProfileProps) {
  const initialState = {
    bio: user.bio,
    coverURL: user.coverURL,
    location: user.location,
    name: user.name,
    photoURL: user.photoURL,
    userName: user.userName,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [loadingCover, setLoadingCover] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);

  const fileChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    fileLocation: string,
    // eslint-disable-next-line no-unused-vars
    callback: (str: string) => void,
    beforeAfter?: Dispatch<SetStateAction<boolean>>
  ) => {
    const file = e.target.files?.item(0);
    if (file) {
      beforeAfter?.(true);
      $firebase
        .uploadImage(file, fileLocation)
        .then(callback)
        .then(() => beforeAfter?.(false))
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  };

  useEffect(() => {
    if (
      !!state.name &&
      !!state.name.trim() &&
      !!state.userName &&
      isValidUsername(state.userName) &&
      JSON.stringify(initialState) !== JSON.stringify(state)
    ) {
      setDraft(state);
      edited(true);
    } else {
      edited(false);
    }
  }, [state]);

  return (
    <>
      <UserCoverImage
        className={`${styles.coverImg}`}
        imgUrl={state.coverURL || ''}
      >
        <div className={styles.editImage}>
          {loadingCover ? (
            <Loading />
          ) : (
            <>
              <label htmlFor="coverImage" data-title="Add photo">
                <input
                  type="file"
                  onChange={(e) =>
                    fileChangeHandler(
                      e,
                      `${user?.id}/cover`,
                      (value) => dispatch({ key: 'coverURL', value }),
                      setLoadingCover
                    )
                  }
                  accept="image/*"
                  id="coverImage"
                  hidden
                />
                <i className="bi bi-camera" />
              </label>
              {!!state.coverURL && (
                <button
                  type="button"
                  data-title="Remove photo"
                  onClick={() => dispatch({ key: 'coverURL', value: '' })}
                >
                  <i className="bi bi-x-lg" />
                </button>
              )}
            </>
          )}
        </div>
      </UserCoverImage>
      <div className={styles.personalInfo}>
        <div className={styles.rowSB}>
          <div className={styles.avatar}>
            <UserImage
              imgUrl={state.photoURL || ''}
              className={styles.userImage}
            >
              <div className={styles.editImage}>
                {loadingImage ? (
                  <Loading />
                ) : (
                  <label htmlFor="userImage" data-title="Add photo">
                    <input
                      type="file"
                      onChange={(e) =>
                        fileChangeHandler(
                          e,
                          `${user?.id}/photo`,
                          (value) => dispatch({ key: 'photoURL', value }),
                          setLoadingImage
                        )
                      }
                      accept="image/*"
                      id="userImage"
                      hidden
                    />
                    <i className="bi bi-camera" />
                  </label>
                )}
              </div>
            </UserImage>
          </div>
        </div>
        <Input
          label="Name"
          value={state.name || ''}
          onChange={(value) => dispatch({ key: 'name', value })}
          maxLength={50}
          required
        />
        <Input
          label="Username"
          value={state.userName || ''}
          onChange={(value) => dispatch({ key: 'userName', value })}
          maxLength={14}
          minLength={4}
          required
          lowercase
          autocomplete={false}
          validate={[
            [
              isValidUsername,
              'Username must only contain letters, numbers, and underscores.',
            ],
            [
              (value) => value.trim() !== 'profile',
              `Username can't be 'profile'`,
            ],
            [$firebase.isUsernameExist, 'Username already exists.'],
          ]}
        />
        <Input
          type="textarea"
          label="Bio (optional)"
          value={state.bio || ''}
          onChange={(value) => dispatch({ key: 'bio', value })}
          maxLength={160}
        />
        <Input
          label="Location (optional)"
          value={state.location || ''}
          onChange={(value) => dispatch({ key: 'location', value })}
          maxLength={30}
        />
      </div>
    </>
  );
}
export default EditProfile;
