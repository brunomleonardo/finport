import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { WalletsDTO } from '../models/wallet';
import { ServicesModule } from './services.module';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_CONSTANTS } from '../utils/api-url';
import { tap, catchError } from 'rxjs/operators';
import { ResponseDto } from '../models/response';
import { Cacheable } from 'ngx-cacheable';

const userWalletNotifier: Subject<ResponseDto<WalletsDTO>> = new Subject();

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  userWallet$: Subject<WalletsDTO> = new BehaviorSubject<WalletsDTO>(null);

  constructor(
    private serviceModule: ServicesModule,
    private httpClient: HttpClient

  ) { }

  @Cacheable({
    cacheBusterObserver: userWalletNotifier
  })

  getUserWallet(): Observable<ResponseDto<WalletsDTO>> {
    console.log("getWalletMethod");
    const userId = this.serviceModule.getUserId();
    if (userId) {
      const httpParams = new HttpParams().append('userId', userId.toString());
      return this.httpClient.get<ResponseDto<WalletsDTO>>(API_CONSTANTS.API_LOAD_WALLET,
        { headers: this.serviceModule.httpOptions_loggedIn.headers, params: httpParams }).pipe(
          tap(_ => this.serviceModule.log('getUserWallet')),
          catchError(this.serviceModule.handleError<any>('getUserWallet'))
        );
    }
    return null;
  }

  @Cacheable({
    cacheBusterObserver: userWalletNotifier
  })
  depositOnWallet(): Observable<ResponseDto<WalletsDTO>> {
    return null;
  }
  @Cacheable({
    cacheBusterObserver: userWalletNotifier
  })
  widthrawFromWallet(): Observable<ResponseDto<WalletsDTO>> {
    return null;
  }
}
