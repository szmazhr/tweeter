import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import $firebase from '../apis/firebase';

function useFileChangeHandler() {
  const fileChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    fileLocation: string,
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

  return fileChangeHandler;
}

export default useFileChangeHandler;
