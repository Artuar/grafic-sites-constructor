import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StoreState } from 'src/app/reducers';

export interface User {
  'at_hash': string;
  'aud': string;
  'azp': string;
  'email': string;
  'email_verified': boolean;
  'exp': number;
  'family_name': string;
  'given_name': string;
  'iat': number;
  'iss': string;
  'jti': string;
  'locale': string;
  'name': string;
  'picture': string;
  'sub': string;
}

@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  private getUserUrl = '/getuser';

  constructor(
    private http: HttpClient,
    private store: Store<StoreState>,
  ) { }

  private handleError(error: Error) {
    console.log('Error: ', error);
    return throwError(error.message);
  }

  getUser() {
    return this.http.get(this.getUserUrl)
      .pipe(
        map((response: User) => response),
        catchError(this.handleError)
      ).subscribe((user) => {
        this.store.dispatch({
          type: 'SET_USER',
          payload: user
        });
      });;
  }
}
