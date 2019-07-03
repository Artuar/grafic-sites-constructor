import { Component, OnInit } from '@angular/core';
import { Site, SitesService } from './sites.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {
  public sites: Site[] = [];

  constructor(
    private getSites: SitesService,
  ) { }

  ngOnInit() {
    this.getSites.getSites()
      .pipe(map((sites: Site[]) => sites))
      .subscribe(sites => this.sites = sites);
  }
}
