import { Injectable } from '@angular/core';
import { DtoUser } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ServicesModule } from './services.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
    private baseService: ServicesModule
  ) { }


  registerUser(user: DtoUser): Observable<Response> {
  {
    return this.httpClient.post<Response>('http://localhost:3000/api/register-user', user);
  }

}
