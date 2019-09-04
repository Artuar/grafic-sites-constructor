import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
  private getAllSitesUrl = '/getsites';
  private getSiteUrl = '/getsites';
  private addSiteUrl = '/addsite';
  private deleteSiteUrl = '/deletesite';
  private editSiteUrl = '/changesite';

  constructor(
    private http: HttpClient,
    private store: Store<StoreState>,
  ) { }

  private handleError(error: Error) {
    console.log('Error: ', error);
    return throwError(error.message);
  }

  get(id: number) {
    return this.http.get(`${this.getSiteUrl}/${id}`)
      .pipe(
        map((response: Site) => response),
        catchError(this.handleError)
      ).subscribe((site) => {
        this.store.dispatch({
          type: 'SET_SITE',
          payload: site
        });
      });
  }

  getAll() {
    return this.http.get(this.getAllSitesUrl)
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

  add(name: string, body: string) {
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams()
    .append('name', name)
    .append('body', body);
    return this.http.put(this.addSiteUrl, params, {headers})
      .pipe(
        catchError(this.handleError)
      ).subscribe((site: Site) => {
        this.store.dispatch({
          type: 'ADD_SITE',
          payload: site
        });
      });
  }

  delete(siteId: number) {
    return this.http.delete(`${this.deleteSiteUrl}/${siteId}`)
      .pipe(
        catchError(this.handleError)
      ).subscribe((sites) => {
        this.store.dispatch({
          type: 'DELETE_SITE',
          payload: {id: siteId}
        });
      });
  }

  edit(siteChanges: Partial<Site>) {
    const { id, name, body, is_public} = siteChanges;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    const params = new HttpParams()
    .append('is_publick', String(is_public))
    .append('name', name)
    .append('body', body);

    return this.http.post(`${this.editSiteUrl}/${id}`, params, {headers})
      .pipe(
        catchError(this.handleError)
      ).subscribe((site: Site) => {
        this.store.dispatch({
          type: 'UPDATE_SITE',
          payload: site
        });
      });
  }

}
