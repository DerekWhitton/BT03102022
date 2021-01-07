import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ITopic } from '@bushtrade/administration-portal/shared/entites';
import { APP_CONFIG } from '@bushtrade/app-config';

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

  listTopics(query: string = '') {
    return this.httpClient.get<ITopic[]>(
      `${this.base}api/v${this.version}/ForumTopics`,
      {
        params: { query },
      }
    );
  }

  getTopicDetails(id: string) {
    return this.httpClient.get<ITopic>(
      `${this.base}api/v${this.version}/ForumTopics/${id}`
    );
  }

  createTopic(topic: any) {
    return this.httpClient.post<ITopic>(
      `${this.base}api/v${this.version}/ForumTopics`,
      {
        ...topic,
      }
    );
  }

  updateTopic(topic: any, topicId: string) {
    return this.httpClient.put<ITopic>(
      `${this.base}api/v${this.version}/ForumTopics/${topicId}`,
      {
        ...topic,
      }
    );
  }
}
