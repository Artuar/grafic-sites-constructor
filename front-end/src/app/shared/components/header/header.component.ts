import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { User, GetUserService } from 'src/app/core/services/get-user.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { GOOGLE_AUTH_COOKIE } from 'src/app/login/login.component.constants';
import { Store } from '@ngrx/store';
import { StoreState } from 'src/app/reducers';

declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public user: User | undefined;
  public loader = false;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private cookie: CookieService,
    private getUser: GetUserService,
    private store: Store<StoreState>,
  ) {
    if (store) {
      store.subscribe(reduxStore => {
        const str = reduxStore['store'];
        if (str) {
          this.user = str.user;
        }
        this.loader = false;
      }, () =>  {
        console.error('Error');
        this.loader = false;
      });
    }
   }

  ngOnInit() {
    if (!this.user) {
      this.getUser.getUser();
    }
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
