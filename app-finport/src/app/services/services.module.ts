import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ServicesModule {

  constructor(
  ) { }

  httpOptions_loggedIn = {
    headers: new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Authorization': "Bearer " + localStorage.getItem('jwtToken')
      }
    )
  };

  httpOptions_signUp = {
    headers: new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    )
  };

  log(message: string) {
    console.log('Log fun:' + message);
  };

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('aqui error');
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  };

}
