import { Injectable } from '@angular/core';
import { ServicesModule } from './services.module';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto } from '../models/response';
import { DtoOperationHistory } from '../models/operationHistory';
import { API_CONSTANTS } from '../utils/api-url';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  constructor(
    private httpClient: HttpClient,
    private serviceModule: ServicesModule,
  ) { }

  getUserOperations(): Observable<ResponseDto<DtoOperationHistory[]>> {
    const httpParams = new HttpParams().append('userId', this.serviceModule.getUserId().toString());
    return this.httpClient.get<ResponseDto<DtoOperationHistory[]>>(API_CONSTANTS.API_GET_OPERATIONS,
      {
        headers: this.serviceModule.httpOptions_loggedIn.headers,
        params: httpParams
      });
  }


}
