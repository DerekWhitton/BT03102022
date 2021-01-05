import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import { IBlogPost } from '@bushtrade/website/shared/entites';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private base: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.blogRoute;
  }

  listPosts(page: number = null) {
    var query = `?page=${page ?? 1}`;
    return this.httpClient.get<IBlogPost[]>(
      `${this.base}wp-json/wp/v2/posts${query}`,
      {
        observe: 'response',
      }
    );
  }

  getPost(postId: string) {
    return this.httpClient.get<IBlogPost>(
      `${this.base}wp-json/wp/v2/posts/${postId}`
    );
  }
}
