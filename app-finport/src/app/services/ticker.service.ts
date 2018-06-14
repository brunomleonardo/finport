import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ServicesModule } from './services.module';
import { DtoTicker } from '../models/ticker';

const httpOptions = {
  headers: new HttpHeaders(
    {
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Content-Type': 'application/json',
    }
  )
};

@Injectable({
  providedIn: 'root'
})

export class TickerService {

  private searchTickerUrl = 'http://localhost:49495/api/ticker'
  private tickerNodeUrl = 'http://localhost:3000/api/tickers'

  constructor(
    private httpClient: HttpClient,
    private serviceModule: ServicesModule
  ) { }

  searchTickers(term: string): Observable<DtoTicker[]> {
    if (!term.trim()) return of([]);
    return this.httpClient.get<DtoTicker[]>(`${this.tickerNodeUrl}/${term}`).
      pipe(
        tap(_ => this.serviceModule.log('shit')),
        catchError(this.serviceModule.handleError<DtoTicker[]>('searchTickers', []))
      );
  }

  loadTickers(): void {
    console.log("here service");
    this.httpClient.get('http://localhost:3000/api/loadtickers', { headers: httpOptions.headers }).subscribe(response => {
      console.log(response);
    },
      err => {
        console.log('Unable to load all tickers', err);
      });
  }

}
