import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { DtoTicker } from '../models/ticker';
import { TickerService } from '../services/ticker.service';

@Component({
  selector: 'app-search-ticker',
  templateUrl: './search-ticker.component.html',
  styleUrls: ['./search-ticker.component.css']
})
export class SearchTickerComponent implements OnInit {

  tickers$: Observable<DtoTicker[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private tickerService: TickerService
  ) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  setTicker(ticker: DtoTicker){
    this.tickerService.getTicker().subscribe(ticker => this.tickerService.ticker = ticker);
    // this.tickerService.ticker = ticker;
  }

  ngOnInit() {
    this.tickers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.tickerService.searchTickers(term))
    );
  }

}
