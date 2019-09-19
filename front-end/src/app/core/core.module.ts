import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { SitesService } from './services/sites.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    CookieService,
    AuthService,
    SitesService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in rhe AppModule only.');
    }
  }
}
