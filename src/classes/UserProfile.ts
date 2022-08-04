import Types from '../types/index.t';

export default class UserProfile implements Types.userDraft {
  readonly bio: string;

  readonly photoURL: string;

  readonly coverURL: string;

  readonly name: string;

  readonly userName: string;

  readonly createdAt: Types.timestamp;

  readonly followings: string[];

  readonly location: string;

  readonly verified: boolean;

  readonly likes: string[];

  constructor({
    createdAt,
    bio,
    photoURL,
    coverURL,
    name,
    userName,
    followings,
    verified,
    location,
    likes,
  }: Types.userProfile) {
    this.createdAt = createdAt;
    this.bio = bio || '';
    this.photoURL = photoURL || '';
    this.coverURL = coverURL || '';
    this.name = name || '';
    this.userName = userName || '';
    this.followings = followings || [];
    this.verified = verified || false;
    this.location = location || '';
    this.likes = likes || [];
  }
}
