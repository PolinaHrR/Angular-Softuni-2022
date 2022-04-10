import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, ReplaySubject, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public _isAuth = new BehaviorSubject<boolean>(this.getToken() !== null);
  public readonly isAuth: Observable<boolean> = this._isAuth.asObservable();

  constructor(
    private router: Router
  ) {
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  getUserId(): string {
    const userId = localStorage.getItem('userId');

    if (userId === null) {
      throw new Error('No user');
    }

    return userId;
  }

  setToken(jwt: string, userId: string): void {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('userId', userId);
    this._isAuth.next(true);
  }

  doLogout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    this._isAuth.next(false);

    this.router.navigate(['']);
  }
}
