import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { STORAGE_KEY_PREFIX } from '../../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);

  private readonly tokenKey = `${STORAGE_KEY_PREFIX}-authToken`;

  constructor(private router: Router) {
    this.determineLoginStatus();
  }

  public login(): void {
    this.loggedIn.next(true);
    localStorage.setItem(this.tokenKey, '');
  }

  public logout(): void {
    this.loggedIn.next(false);
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']).catch(console.error);
  }

  // TODO: implement signup
  public signup(): void {
    console.log(this);
    console.log('signing up!');
  }

  private determineLoginStatus(): void {
    const tokenItem = localStorage.getItem(this.tokenKey);

    if (tokenItem != null) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }
}
