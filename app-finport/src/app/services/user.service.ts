import { Injectable } from '@angular/core';
import { UsersDTO } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ServicesModule } from './services.module';
import { API_CONSTANTS } from '../utils/api-url';
import { ResponseDto } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loggedIn$: Subject<boolean> = new BehaviorSubject<boolean>(false);
  userName$: Subject<String> = new BehaviorSubject<String>('');

  constructor(
    private httpClient: HttpClient,
    private serviceModule: ServicesModule
  ) { }


  registerUser(user: UsersDTO): Observable<any> {
    const body: UsersDTO = user;
    return this.httpClient.post(API_CONSTANTS.API_SIGN_UP, body, { headers: this.serviceModule.httpOptions_signUp.headers })
      .pipe(
        tap(_ => this.serviceModule.log('Logging on register user')),
        catchError(this.serviceModule.handleError<any>('registerUser'))
      );
  }

  loginUser(username: String, password: String): Observable<ResponseDto<UsersDTO>> {
    const body: any = {
      username: username,
      password: password,
    };
    return this.httpClient.post<ResponseDto<UsersDTO>>(API_CONSTANTS.API_SIGN_IN, body);
  }

  getLoggedInState(): Observable<boolean> {
    return this.loggedIn$;
  }

  setLoggedInState(state: boolean): void {
    this.loggedIn$.next(state);
  }

  getUserName(): Observable<String> {
    return this.userName$;
  }

  setUserName(username: String): void {
    this.userName$.next(username);
  }

}
