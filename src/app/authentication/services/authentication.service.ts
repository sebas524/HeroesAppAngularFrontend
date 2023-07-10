import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { CurrentUserInterface } from '../interfaces/currentUser.interface';
import { HttpClient } from '@angular/common/http';
import { RegisterRequestInterface } from '../interfaces/registerRequest.interface';
import { loginRequest } from '../interfaces/loginRequest.interface';
import { environments } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private baseUrl = environments.baseUrl;
  currentUser$ = new BehaviorSubject<CurrentUserInterface | null | undefined>(
    undefined
  );
  isLoggedIn$ = this.currentUser$.pipe(
    filter((currentUser) => {
      return currentUser !== undefined;
    }),
    map((currentUser) => {
      return Boolean(currentUser);
    })
  );

  constructor() {}

  getCurrentUser(): Observable<CurrentUserInterface> {
    const fullUrl = `${this.baseUrl}/api/users/user`;
    return this.http.get<CurrentUserInterface>(fullUrl);
    // * note: we wabnt to get the user every time when we load our app. why? because normally we store our current user in memory, and after login or register we store it in localstorage. so every time we are jumping into our app we would need to get current user. best way to do this is in app component.because this component loads once throughout the whole lifecyle.
  }

  setCurrentUser(currentUser: CurrentUserInterface | null): void {
    // * to change value
    this.currentUser$.next(currentUser);
    // * so here currentUser$ can be either CurrentUser|null
  }

  register(
    registerRequest: RegisterRequestInterface
  ): Observable<CurrentUserInterface> {
    const fullUrl = `${this.baseUrl}/api/users/register`;
    return this.http.post<CurrentUserInterface>(fullUrl, registerRequest);
    // * remember here also comes a token, we gotta save it to localstorage (setToken() takes care of that).
  }

  setToken(currentUser: CurrentUserInterface): void {
    // * it is void because we dont need to return anything, just save to localstorage

    localStorage.setItem('heroToken2', currentUser.token);
  }

  login(loginRequest: loginRequest) {
    const fullUrl = `${this.baseUrl}/api/users/login`;
    return this.http.post<CurrentUserInterface>(fullUrl, loginRequest);
  }

  logout() {
    localStorage.removeItem('heroToken2');
    this.currentUser$.next(null);
  }
}
