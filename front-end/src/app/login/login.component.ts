import { Component, AfterViewInit, NgZone } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GOOGLE_AUTH_COOKIE } from './login.component.constants';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {

  constructor(
    private cookie: CookieService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  onFailure() {
    console.log('failure auth');
  }

  onSignIn(googleUser: any) {
    const id_token = googleUser.getAuthResponse().id_token;
    this.cookie.set(GOOGLE_AUTH_COOKIE, id_token);
    this.goToSitesPage();
  }

  goToSitesPage() {
    this.ngZone.run(() => this.router.navigateByUrl(''));
  }

  ngAfterViewInit() {
    gapi.signin2.render('my-signin2', {
        scope: 'profile email',
        width: 240,
        height: 50,
        longtitle: true,
        theme: 'light',
        onsuccess: param => this.onSignIn(param),
        onfailure: () => this.onFailure(),
    });
  }

}
