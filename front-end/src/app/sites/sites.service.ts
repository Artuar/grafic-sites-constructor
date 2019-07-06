import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StoreState } from '../reducers';

export interface Site {
  'id': number;
  'name': string;
  'is_public': boolean;
  'body': string;
}

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  private getSitesUrl = '/getsites';

  constructor(
    private http: HttpClient,
    private store: Store<StoreState>,
  ) { }

  private handleError(error: Error) {
    console.log('Error: ', error);
    return throwError(error.message);
  }

  getSites() {
    return this.http.get(this.getSitesUrl)
      .pipe(
        map((response: Site[]) => response),
        catchError(this.handleError)
      ).subscribe((sites) => {
        this.store.dispatch({
          type: 'SET_SITES',
          payload: sites
        });
      });
  }
}
