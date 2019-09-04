import { NgModule } from '@angular/core';
import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';
import { SharedModule } from '../shared/shared.module';
import { SiteComponent } from './site/site.component';

@NgModule({
  declarations: [SitesComponent, SiteComponent],
  imports: [
    SitesRoutingModule,
    SharedModule,
  ]
})
export class SitesModule { }
