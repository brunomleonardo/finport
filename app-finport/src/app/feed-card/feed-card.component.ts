import { Component, OnInit, Input } from '@angular/core';
import { FeedEntry } from '../models/feed-entry';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit {

  @Input()
  feed: FeedEntry;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToNewsPage(): void {
    window.open(
      this.feed.link,
      '_blank'
    );
  }

}
