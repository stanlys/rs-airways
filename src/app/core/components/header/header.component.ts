import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { NavigationService } from '../../../shared/services/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public mainPage = this.navigationService.mainPage$;

  public loggedIn$ = this.authService.loggedIn$;

  public authModalActive = false;

  constructor(private authService: AuthService, private navigationService: NavigationService) {}
}
