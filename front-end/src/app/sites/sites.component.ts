import { Component, OnInit } from '@angular/core';
import { Site, SitesService } from './sites.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { StoreState } from '../reducers';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
  public sites: Site[] = [];
  public loader = false;

  constructor(
    private store: Store<StoreState>,
    private getSites: SitesService,
  ) {
    if (store) {
      store.subscribe( reduxStore => {
        const str = reduxStore['store'];
        if (str) {
          this.sites = str.sites;
        }
        this.loader = false;
      }, () =>  {
        console.error('Error');
        this.loader = false;
      });
    }
  }

  ngOnInit() {
    if (!this.sites.length) {
      this.getSites.getSites();
    }
  }
}
