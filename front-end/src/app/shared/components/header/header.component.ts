import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { User, GetUserService } from 'src/app/core/services/get-user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { GOOGLE_AUTH_COOKIE } from 'src/app/login/login.component.constants';

declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public user: User | undefined;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private cookie: CookieService,
    private getUser: GetUserService,
  ) { }

  ngOnInit() {
    this.getUser.getUser()
      .pipe(map((user: User) => user))
      .subscribe(user => this.user = user);
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
