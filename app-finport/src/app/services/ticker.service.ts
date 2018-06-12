import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ServicesModule } from './services.module';
import { DtoTicker } from '../models/ticker';

const httpOptions = {
  headers: new HttpHeaders(
    {
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})

export class TickerService {

  private searchTickerUrl = 'http://localhost:49495/api/ticker'

  ticker: DtoTicker;

  constructor(
    private httpClient: HttpClient,
    private serviceModule: ServicesModule
  ) { }

  searchTickers(term: string): Observable<DtoTicker[]> {
    if (!term.trim()) return of([]);
    return this.httpClient.get<DtoTicker[]>(`${this.searchTickerUrl}/?ticker=${term}`).
      pipe(
        tap(_ => this.serviceModule.log('shit')),
        catchError(this.serviceModule.handleError<DtoTicker[]>('searchTickers', []))
      );
  }

  getTicker(): Observable<DtoTicker> {
    return of(this.ticker);
  }

}
