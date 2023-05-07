import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, take, timeout } from 'rxjs';

import { API_BASE_URL, STORAGE_KEY_PREFIX } from '../../shared/constants';
import { LoginRequest, RegistrationRequest } from '../models/requests.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public loggedIn = new BehaviorSubject<boolean>(false);

  private readonly tokenKey = `${STORAGE_KEY_PREFIX}-authToken`;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private router: Router, private http: HttpClient, private snackBar: MatSnackBar) {
    this.determineLoginStatus();
  }

  public login(value: LoginRequest): void {
    const url = `${API_BASE_URL}auth/login`;
    const body = JSON.stringify(value);

    this.http
      .post<{ token: string }>(url, body, this.httpOptions)
      .pipe(take(1), timeout(3000), catchError(this.handleError('login', {})))
      .subscribe((res) => this.handleToken(res));
  }

  public logout(): void {
    this.loggedIn.next(false);

    localStorage.removeItem(this.tokenKey);

    this.router.navigate(['/']).catch(console.error);
  }

  public signup(value: RegistrationRequest): void {
    const url = `${API_BASE_URL}auth/registration`;

    const body = JSON.stringify(value);

    this.http
      .post<{ token: string }>(url, body, this.httpOptions)
      .pipe(take(1), timeout(3000), catchError(this.handleError('signup', {})))
      .subscribe((res) => this.handleToken(res));
  }

  private determineLoginStatus(): void {
    const tokenItem = localStorage.getItem(this.tokenKey);

    if (tokenItem != null) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: Error | undefined): Observable<T> => {
      console.error(operation, error);

      this.snackBar.open('Incorrect credentials', 'Close', {
        duration: 3000,
      });

      return of(result as T);
    };
  }

  private handleToken(res: { token: string } | Record<string, never>): void {
    if ('token' in res) {
      localStorage.setItem(this.tokenKey, res.token);
      this.loggedIn.next(true);
    }
  }
}
