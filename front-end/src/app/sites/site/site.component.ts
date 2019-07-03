import { Component, OnInit, Input } from '@angular/core';
import { Site } from '../sites.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  @Input() site: Site;

  constructor() { }

  ngOnInit() {
  }

}
