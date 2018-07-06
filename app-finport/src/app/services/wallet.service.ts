import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { DtoWallet } from '../models/wallet';
import { ServicesModule } from './services.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_CONSTANTS } from '../utils/api-url';
import { tap, catchError } from 'rxjs/operators';
import { ResponseDto } from '../models/response';
import { Cacheable } from 'ngx-cacheable';

const userWalletNotifier: Subject<ResponseDto<DtoWallet>> = new Subject();

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  userWallet$: Subject<DtoWallet> = new BehaviorSubject<DtoWallet>(null);

  constructor(
    private serviceModule: ServicesModule,
    private httpClient: HttpClient

  ) { }

  @Cacheable({
    cacheBusterObserver: userWalletNotifier
  })

  getUserWallet(): Observable<ResponseDto<DtoWallet>> {
    console.log("getWalletMethod");
    const userId = this.serviceModule.getUserId();
    const httpParams = new HttpParams().append('userId', userId.toString());
    return this.httpClient.get<ResponseDto<DtoWallet>>(API_CONSTANTS.API_LOAD_WALLET,
      { headers: this.serviceModule.httpOptions_loggedIn.headers, params: httpParams }).pipe(
        tap(_ => this.serviceModule.log('getUserWallet')),
        catchError(this.serviceModule.handleError<any>('getUserWallet'))
      );
  }

  @Cacheable({
    cacheBusterObserver: userWalletNotifier
  })
  depositOnWallet(): Observable<ResponseDto<DtoWallet>> {
    return null;
  }
  @Cacheable({
    cacheBusterObserver: userWalletNotifier
  })
  widthrawFromWallet(): Observable<ResponseDto<DtoWallet>> {
    return null;
  }
}
