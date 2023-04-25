import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public mainPage = true;

  public loggedIn = false;

  constructor(router: Router) {
    router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe((e) => {
      if (e instanceof NavigationEnd && e.urlAfterRedirects.includes('main')) {
        document.body.classList.add('main-page');
        this.mainPage = true;
      } else {
        document.body.classList.remove('main-page');
        this.mainPage = false;
      }
    });
  }

  // TODO: implement auth
  // public showAuth(): void {}
}
