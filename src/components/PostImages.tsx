import { Dispatch, SetStateAction } from 'react';
import Loading from './Loading';
import Styles from './PostImages.module.css';

type PostImagesProps = {
  media: string[];
  className?: string;
  loadingImage?: boolean;
  removeImage?: Dispatch<SetStateAction<string[]>>;
};

function PostImages({
  media,
  removeImage,
  className = '',
  loadingImage = false,
}: PostImagesProps) {
  return (
    <div
      className={`${Styles.images} ${className} ${
        Styles[`images-${media.length + (loadingImage ? 1 : 0)}`]
      }`}
    >
      {media.map((imgUrl) => (
        <div key={imgUrl} className={Styles.imaWrapper}>
          <img className={Styles.img} src={imgUrl} alt="post-media" />
          {!!removeImage && (
            <button
              className={Styles.remove}
              type="button"
              data-title="Remove Image"
              onClick={() => removeImage(media.filter((url) => url !== imgUrl))}
            >
              <i className="bi bi-x-lg" />
            </button>
          )}
        </div>
      ))}
      {loadingImage && (
        <div className={Styles.imaWrapper}>
          <Loading />
        </div>
      )}
    </div>
  );
}
export default PostImages;
