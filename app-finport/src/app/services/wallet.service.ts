import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { DtoWallet } from '../models/wallet';
import { ServicesModule } from './services.module';
import { HttpClient } from '@angular/common/http';
import { API_CONSTANTS } from '../utils/api-url';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  userWallet$: Subject<DtoWallet> = new BehaviorSubject<DtoWallet>(null);

  constructor(
    private serviceModule: ServicesModule,
    private httpClient: HttpClient

  ) { }


  getUserWallet(): Observable<DtoWallet> {
    console.log(this.serviceModule.getUserId());
    var userId = 1013;
    return this.httpClient.get<DtoWallet>(`${API_CONSTANTS.API_LOAD_WALLET}/${userId}`, { headers: this.serviceModule.httpOptions_loggedIn.headers }).pipe(
      tap(_ => this.serviceModule.log('getUserWallet')),
      catchError(this.serviceModule.handleError<any>('getUserWallet'))
    );
  }

}
