import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site, SitesService, SiteContent } from '../core/services/sites.service';
import { Store } from '@ngrx/store';
import { StoreState } from '../reducers';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  private id: number;
  public site: Site;
  public loader = false;
  public siteContent: Partial<SiteContent> = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<StoreState>,
    private sitesService: SitesService,
  ) {
    if (this.activatedRoute) {
      this.activatedRoute.params.subscribe(params => {
        const num = +(params['id']);
        if (isNaN(num)) {
          return;
        }
        this.id = +num;
      });
    }
    if (store && this.id) {
      store.subscribe( reduxStore => {
        const str = reduxStore['store'];
        if (str) {
          console.log(str.sites);
          this.site = str.sites.filter((site: Site) => { console.log(site.id, this.id); return site.id === this.id; })[0];
          try {
            this.siteContent = JSON.parse(this.site.body);
          } catch (e) {
            console.error(e);
          }
        }
        this.loader = false;
      }, () =>  {
        console.error('Error');
        this.loader = false;
      });
    }
  }

  onDelete() {
    this.sitesService.delete(this.id);
  }

  onRename(name: string) {
    this.onChange({id: this.id, name});
  }

  onBodyUpdate(body: Partial<SiteContent>) {
    this.onChange({id: this.id, body: JSON.stringify(body)});
  }

  onChange(siteChanges: Partial<Site>) {
    this.sitesService.edit(siteChanges);
  }

  ngOnInit() {
    if (this.id) {
      this.sitesService.get(this.id);
    }
  }
}
