import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ServicesModule } from './services.module';
import { DtoTicker } from '../models/ticker';
import { API_CONSTANTS } from '../utils/api-url';
import { DtoOperationHistory } from '../models/operationHistory';
import { ResponseDto } from '../models/response';

@Injectable({
  providedIn: 'root'
})

export class TickerService {

  constructor(
    private httpClient: HttpClient,
    private serviceModule: ServicesModule
  ) { }

  searchTickers(term: string): Observable<DtoTicker[]> {
    if (!term.trim()) return of([]);
    return this.httpClient.get<any>(`${API_CONSTANTS.API_FIND_TICKER}/${term}`).
      pipe(
        map(res => <DtoTicker[]>res.obj),
        tap(_ => this.serviceModule.log('shit')),
        catchError(this.serviceModule.handleError<DtoTicker[]>('searchTickers', []))
      );
  }

  loadTickers(): void {
    this.httpClient.get(API_CONSTANTS.API_LOAD_TICKERS,
      { headers: this.serviceModule.httpOptions_signUp.headers }).subscribe(response => {
        console.log(response);
      },
        err => {
          console.log('Unable to load all tickers', err);
        });
  }

  addTicker(operationHistory: DtoOperationHistory, tickerId: number): Observable<ResponseDto> {
    const body = {
      operationType: 'C',
      tickerId: tickerId,
      userId: localStorage.getItem('userId'),
      buyPrice: operationHistory.buyPrice,
      conversionUSD: operationHistory.conversionUSD,
      amount: operationHistory.amount,
      total: operationHistory.total,
      totalConverted: operationHistory.totalConverted
    }
    console.log(body);
    return this.httpClient.post<ResponseDto>(API_CONSTANTS.API_ADD_TICKER, body,
      { headers: this.serviceModule.httpOptions_loggedIn.headers });
  }

}
