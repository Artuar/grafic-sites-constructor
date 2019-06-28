import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface AuthResponce {
  auth: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private checkAuthUrl = '/checkauth';

  constructor(private http: HttpClient) { }

  private handleError(error: Error) {
    console.log('Error', error);
    return throwError(error.message);
  }

  checkAuth() {
    return this.http.get(this.checkAuthUrl)
      .pipe(
        map((response: AuthResponce) => response.auth),
        catchError(this.handleError)
      );
  }
}
