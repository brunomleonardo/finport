import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderValue$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() {
  }


  setLoaderVisibility(value: boolean): void {
    this.loaderValue$.next(value);
  }

  getLoaderValue(): Observable<boolean> {
    return this.loaderValue$;
  }

}
