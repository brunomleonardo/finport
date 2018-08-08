import { Component, OnInit } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { DtoProduct } from '../models/product';
import { ProductService } from '../services/product.service';
import { ResponseDto } from '../models/response';

@Component({
  selector: 'app-search-ticker',
  templateUrl: './search-ticker.component.html',
  styleUrls: ['./search-ticker.component.css']
})
export class SearchTickerComponent implements OnInit {

  tickers$: Observable<ResponseDto<DtoProduct[]>>;
  tickers: DtoProduct[];
  private searchTerms = new Subject<string>();
  ticker: DtoProduct;
  offset: Number;

  constructor(
    private ProductService: ProductService
  ) { }

  ngOnInit() {
    this.tickers$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.ProductService.searchTickers(term))
    );
    this.tickers$.subscribe((res: ResponseDto<DtoProduct[]>) => {
      this.tickers = res.Data;
    });
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  setTicker(ticker: DtoProduct) {
    this.ticker = ticker;
    this.searchTerms = new Subject<string>();
    this.tickers$ = new Observable<ResponseDto<DtoProduct[]>>();
  }

  onScroll(): void {
    // console.log("scrolled!!");
  }

}
