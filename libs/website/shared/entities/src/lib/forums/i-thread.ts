import { IForumUser } from './i-forum-user';
import { IPost } from './i-post';

export interface IThread {
  id: string;
  name: string;
  user: IForumUser;
  createdAt: any;
  posts: IPost[];
}
