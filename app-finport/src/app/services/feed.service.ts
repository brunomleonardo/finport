import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicesModule } from './services.module';
import { Feed } from '../models/feed';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url=';

  constructor(
    private httpClient: HttpClient,
    private serviceModule: ServicesModule) { }

  getFeedContent(url: string): Observable<Feed> {
    return this.httpClient.get<any>(this.rssToJsonServiceBaseUrl + url)
      .pipe(
        map(res => res),
        catchError(this.serviceModule.handleError('getFeedContent', []))
      );
  }

  // extractFeeds(res: Response): Feed {
  //   let feed = res.json();
  //   return feed || {};
  // }

}
