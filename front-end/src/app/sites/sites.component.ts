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

  public displayedColumns: string[] = ['email', 'name', 'is_public', 'created', 'actions'];
  public sites: Site[] = [];
  public loader = false;

  constructor(
    private store: Store<StoreState>,
    private sitesService: SitesService,
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

  addSite() {
    this.sitesService.add('New sites', '{}');
  }

  onDelete(siteId: number) {
    this.sitesService.delete(siteId);
  }

  onRename(id: number, name: string) {
    this.onChange({id, name});
  }

  onChange(siteChanges: Partial<Site>) {
    this.sitesService.edit(siteChanges);
  }

  ngOnInit() {
    if (!this.sites.length) {
      this.sitesService.getAll();
    }
  }
}
