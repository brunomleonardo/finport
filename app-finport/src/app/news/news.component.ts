import { Component, OnInit, Input } from '@angular/core';
import { FeedService } from '../services/feed.service';
import { FeedEntry } from '../models/feed-entry';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  private rssUrl: string = 'https://www.cnbc.com/id/100003114/device/rss/rss.html';
  private feeds: FeedEntry[];

  constructor(private feedService: FeedService) { }

  ngOnInit() {
    this.refreshFeed();
  }

  // GET NEWS BY PORTOFOLIO

  refreshFeed(): void {
    this.feedService.getFeedContent(this.rssUrl)
      .subscribe(
        feed => this.feeds = feed.items,
        error => console.log(error)
      );
  }

}
