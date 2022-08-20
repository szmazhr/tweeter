import { useContext, useRef, useState } from 'react';
import { LoggedInUser } from '../contexts/index.c';
import UserImage from './UserImage';
import styles from './TweetBox.module.css';
import IconBtn from './IconBtn';
import Btn from './Btn';
import PostText from './PostText';
import $firebase from '../apis/firebase';
import Loading from './Loading';
import useFileChangeHandler from '../hooks/useFileChangeHandler';
import PostImages from './PostImages';

function TweetBox({ onSuccess }: { onSuccess: () => void }) {
  const loggedInUser = useContext(LoggedInUser);
  const [textarea, setTextarea] = useState<string>('');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [isTweeting, setIsTweeting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [images, setImages] = useState<string[]>([]);
  const fileChangeHandler = useFileChangeHandler();
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const imgInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (!loggedInUser) return;
    setIsTweeting(true);
    $firebase
      .postNewTweet(textarea, images)
      .then(() => {
        onSuccess();
        setIsTweeting(false);
        setTextarea('');
        setImages([]);
      })
      // eslint-disable-next-line no-console
      .catch(console.error);
  };

  const handleImageChange = (url: string) => {
    if (images.length < 4) {
      setImages((prev) => [...prev, url]);
    }
  };

  const inputHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 140) return;
    setTextarea(e.target.value);
  };

  return (
    <div className={styles.tweetBox}>
      <div className={styles.tweetBoxImg}>
        <UserImage imgUrl={loggedInUser?.photoURL} />
      </div>
      <div className={styles.tweetBoxContent}>
        <div className={styles.row_textarea}>
          {/* This section told me that I have to learn a lot, it should be done without textarea but... */}
          <div
            role="textbox"
            tabIndex={0}
            className={`${styles.textarea} ${styles.text}`}
            onClick={() => editorRef.current?.focus()}
            onFocus={() => editorRef.current?.focus()}
            aria-hidden="true"
          >
            <PostText text={textarea} />
          </div>
          <textarea
            spellCheck={false}
            ref={editorRef}
            className={`${styles.hiddenTextArea} ${styles.text}`}
            onInput={inputHandler}
            value={textarea}
          />
          {!textarea && (
            <div className={`${styles.placeholder} ${styles.text}`}>
              What is happening?
            </div>
          )}
        </div>
        <PostImages
          media={images}
          loadingImage={loadingImage}
          className={styles.tweetBoxPostImg}
          removeImage={setImages}
        />
        <div className={styles.row_action}>
          <div className={styles.miniAction}>
            <input
              ref={imgInputRef}
              type="file"
              onChange={(e) =>
                fileChangeHandler(
                  e,
                  `posts`,
                  (value) => handleImageChange(value),
                  setLoadingImage
                )
              }
              accept="image/*"
              id="coverImage"
              hidden
            />
            <IconBtn
              icon="image"
              label="media"
              btnStyle={images.length < 4 ? 'editor' : 'editor-disabled'}
              onClick={() => {
                imgInputRef.current?.click();
              }}
            />
            {/* <IconBtn
              icon="filetype-gif"
              label="GIF"
              btnStyle="editor"
              onClick={() => {
                return null;
              }}
            /> */}
          </div>
          {!!textarea && (
            <div className={styles.progressBarContainer}>
              <div
                role="progressbar"
                aria-valuenow={textarea.length}
                aria-valuemin={0}
                aria-valuemax={140}
                style={
                  {
                    '--value': textarea.length,
                    '--max': 140,
                    '--color':
                      // eslint-disable-next-line no-nested-ternary
                      textarea.length < 120
                        ? 'var(--primary-color)'
                        : textarea.length === 140
                        ? 'red'
                        : 'yellow',
                  } as React.CSSProperties
                }
                className={styles.progressBar}
                aria-hidden="true"
              >
                {textarea.length >= 120 && <span>{140 - textarea.length}</span>}
              </div>
            </div>
          )}
          <div className={styles.tweetBtnContainer}>
            <Btn
              btnStyle={
                (textarea.trim() || images.length) && !loadingImage
                  ? 'primary'
                  : 'primary-disabled'
              }
              label="Tweet"
              className={styles.tweetBtn}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
      {isTweeting && (
        <div className={styles.loading}>
          <Loading />
        </div>
      )}
    </div>
  );
}
export default TweetBox;
