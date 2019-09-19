import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Site } from '../../core/services/sites.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  @Input() site: Site;
  @Output() del = new EventEmitter();
  @Output() edit = new EventEmitter();

  public name = '';

  constructor() { }

  rename() {
    this.edit.emit({id: this.site.id, name: this.name});
  }

  delete() {
    this.del.emit(this.site.id);
  }

  ngOnInit() {
    this.name = this.site.name;
  }

}
