import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_CONFIG } from '@bushtrade/app-config';
import {
  IListing,
  IPaginatedResponse,
  IPost,
  IThread,
  ITopic,
} from '@bushtrade/website/shared/entites';

@Injectable({
  providedIn: 'root',
})
export class ForumsService {
  private base: string;
  private version: string;
  constructor(
    @Inject(APP_CONFIG) private configuration: any,
    private httpClient: HttpClient
  ) {
    this.base = configuration.apiRoute;
    this.version = configuration.apiVersion;
  }

  listTopics() {
    return this.httpClient.get<ITopic[]>(
      `${this.base}api/v${this.version}/Forum/topics`
    );
  }

  listTopicThreads(topicId: string, page: number) {
    return this.httpClient.get<IPaginatedResponse<IThread>>(
      `${this.base}api/v${this.version}/Forum/topics/${topicId}/threads?page=${page}`
    );
  }

  addTopicThread(topicId: string, name: string) {
    return this.httpClient.post<IThread>(
      `${this.base}api/v${this.version}/Forum/topics/${topicId}/threads`,
      {
        name,
      }
    );
  }

  listThreadPosts(topicId: string, threadId: string, page: number) {
    return this.httpClient.get<IPaginatedResponse<IPost>>(
      `${this.base}api/v${this.version}/Forum/topics/${topicId}/threads/${threadId}/posts?page=${page}`
    );
  }

  addThreadPost(topicId: string, threadId: string, content: string) {
    return this.httpClient.post<IPost>(
      `${this.base}api/v${this.version}/Forum/topics/${topicId}/threads/${threadId}/posts`,
      {
        content,
      }
    );
  }
}
