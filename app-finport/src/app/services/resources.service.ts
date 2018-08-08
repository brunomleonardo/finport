import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { CurrenciesDTO } from '../models/currencies';
import { API_CONSTANTS } from '../utils/api-url';
import { ResponseDto } from '../models/response';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(
    private httpClient: HttpClient
  ) { }


  loadCurrencies(): Observable<CurrenciesDTO[]> {
    return this.httpClient.get<ResponseDto<CurrenciesDTO[]>>(API_CONSTANTS.API_LOAD_CURRENCIES).
    pipe(
      map((res : ResponseDto<CurrenciesDTO[]>) => {
        return res.Data
      })
    );
  }

}
