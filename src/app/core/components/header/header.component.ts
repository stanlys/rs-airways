import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public mainPage = true;

  public loggedIn = this.authService.loggedIn;

  public authModalActive = true;

  constructor(router: Router, private authService: AuthService) {
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
}
