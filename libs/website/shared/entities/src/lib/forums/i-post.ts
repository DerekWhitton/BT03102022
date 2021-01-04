import { IForumUser } from './i-forum-user';

export interface IPost {
  id: string;
  name: string;
  user: IForumUser;
  createdAt: any;
  updatedAt: any;
}
