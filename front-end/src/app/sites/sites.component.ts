import { Component, OnInit, NgZone, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { GOOGLE_AUTH_COOKIE } from '../login/login.component.constants';

declare const gapi: any;

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit, AfterViewInit {

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private cookie: CookieService
  ) { }

  ngOnInit() {
  }

  signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      auth2.disconnect();
      console.log('User signed out.');
      this.cookie.delete(GOOGLE_AUTH_COOKIE);
      this.ngZone.run(() => this.router.navigateByUrl('login'));
    });
  }

  ngAfterViewInit() {
    if (!gapi.auth2) {
      gapi.load('auth2', () => {
          gapi.auth2.init();
      });
    }
  }

}
