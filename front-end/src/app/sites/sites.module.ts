import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';
import { SharedModule } from '../shared/shared.module';
import { SiteComponent } from './site/site.component';

@NgModule({
  declarations: [SitesComponent, SiteComponent],
  imports: [
    CommonModule,
    SitesRoutingModule,
    SharedModule,
  ]
})
export class SitesModule { }
