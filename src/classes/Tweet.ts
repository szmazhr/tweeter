import Types from '../types/index.t';

export default class Tweet {
  readonly text: string;

  readonly createdAt: Types.timestamp;

  readonly media: string[];

  readonly hashTags: string[];

  readonly thread: string;

  constructor({ createdAt, text, media, thread }: Types.postData) {
    this.createdAt = createdAt;
    this.text = text || '';
    this.media = media || [];
    this.thread = thread || '';
    this.hashTags = text
      .toLowerCase()
      .split(/[\s\n]/)
      .filter((x) => /^#\w+$/.test(x));
  }
}
