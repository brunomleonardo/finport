import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ServicesModule } from './services.module';
import { DtoProduct } from '../models/product';
import { API_CONSTANTS } from '../utils/api-url';
import { DtoOperationHistory } from '../models/operationHistory';
import { ResponseDto } from '../models/response';
import { LoaderService } from 'src/app/services/loader.service';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(
    private httpClient: HttpClient,
    private serviceModule: ServicesModule,
    private loaderService: LoaderService
  ) { }

  searchTickers(term: string): Observable<ResponseDto<DtoProduct[]>> {
    console.log(`${API_CONSTANTS.API_FIND_TICKER}/${term}`);
    if (!term.trim()) { return of(new ResponseDto<DtoProduct[]>()); }
    this.loaderService.setLoaderVisibility(true);
    return this.httpClient.get<ResponseDto<DtoProduct[]>>(`${API_CONSTANTS.API_FIND_TICKER}/${term}`,
      { headers: this.serviceModule.httpOptions_loggedIn.headers }).
      pipe(
        tap(_ => {
          this.serviceModule.log('shit');
          this.loaderService.setLoaderVisibility(false);
        }),
        catchError(this.serviceModule.handleError<ResponseDto<DtoProduct[]>>('searchTickers', new ResponseDto<DtoProduct[]>())),
    );
  }

  loadTickers(): void {
    this.httpClient.get(API_CONSTANTS.API_LOAD_TICKERS,
      { headers: this.serviceModule.httpOptions_loggedIn.headers }).subscribe(response => {
        console.log(response);
      },
        err => {
          console.log('Unable to load all tickers', err);
        });
  }

  addTicker(operationHistory: DtoOperationHistory, tickerId: number): Observable<ResponseDto<DtoOperationHistory>> {
    const body = {
      operationType: 'C',
      tickerId: tickerId,
      userId: localStorage.getItem('userId'),
      buyPrice: operationHistory.buyPrice,
      conversionUSD: operationHistory.conversionUSD,
      amount: operationHistory.amount,
      total: operationHistory.total,
      totalConverted: operationHistory.totalConverted
    };
    console.log(body);
    return this.httpClient.post<ResponseDto<DtoOperationHistory>>(API_CONSTANTS.API_ADD_TICKER, body,
      { headers: this.serviceModule.httpOptions_loggedIn.headers });
  }

}
