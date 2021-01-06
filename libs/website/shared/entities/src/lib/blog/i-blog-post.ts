import { IContent } from './i-blog-post-content';
import { IBlogPostTitle } from './i-blog-post-title';

export interface IBlogPost {
  id: number;
  date: Date;
  date_gmt: Date;
  modified: Date;
  modified_gmt: Date;
  slug: string;
  status: string;
  type: string;
  link: string;
  title: IBlogPostTitle;
  content: IContent;
  excerpt: IContent;
  author: number;
  featured_media: number;
  comment_status: string;
  ping_status: string;
  sticky: boolean;
  template: string;
  format: string;
  meta: any[];
  categories: number[];
  tags: any[];
  _embedded: any;
}
