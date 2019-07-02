import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SitesRoutingModule } from './sites-routing.module';
import { SitesComponent } from './sites.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SitesComponent],
  imports: [
    CommonModule,
    SitesRoutingModule,
    SharedModule,
  ]
})
export class SitesModule { }
