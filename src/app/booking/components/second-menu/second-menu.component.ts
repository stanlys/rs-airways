import { Component } from '@angular/core';
import { SearchService } from '../../../main/services/search.service';

@Component({
  selector: 'app-second-menu',
  templateUrl: './second-menu.component.html',
  styleUrls: ['./second-menu.component.scss'],
})
export class SecondMenuComponent {
  public showSearchForm = true;

  constructor(private searchService: SearchService) {
    this.searchService.requestData$.subscribe((v) => {});
  }
}
