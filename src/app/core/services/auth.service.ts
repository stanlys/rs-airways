import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, of, timeout } from 'rxjs';

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

  constructor(private router: Router, private http: HttpClient) {
    this.determineLoginStatus();
  }

  public login(value: LoginRequest): void {
    const url = `${API_BASE_URL}auth/login`;
    const body = JSON.stringify(value);

    this.http
      .post<{ token: string }>(url, body, this.httpOptions)
      .pipe(timeout(3000), catchError(AuthService.handleError('getResponse', {})))
      .subscribe((res) => this.handleToken(res));

    localStorage.setItem(this.tokenKey, '');
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
      .pipe(timeout(3000), catchError(AuthService.handleError('getResponse', {})))
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

  private static handleError<T>(operation = 'operation', result?: T) {
    return (error: Error | undefined): Observable<T> => {
      console.error(operation, error);

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
