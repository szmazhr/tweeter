import { Link } from 'react-router-dom';
import styles from './PostText.module.css';

function PostText({ text, className }: { text: string; className?: string }) {
  let i = 0;
  let j = 0;
  const lines = text.split(/\n/);
  const linesWithHashTags = lines.map((line: string) => {
    const words = line.split(/(\s)/);
    const lineWithHashtag = words.map((word: string) => {
      i += 1;
      if (/^#\w+$/.test(word)) {
        j += 1;
        return (
          <Link key={j} to={`/hashtag/${word.slice(1)}`}>
            {word}
          </Link>
        );
      }
      return word;
    });
    return (
      <div className={styles.oneLine} key={i}>
        {lineWithHashtag}
      </div>
    );
  });
  return <div className={className}>{linesWithHashTags}</div>;
}

export default PostText;
