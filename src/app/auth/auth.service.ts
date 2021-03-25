import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient}  from '@angular/common/http'
import { Subject } from 'rxjs';
import { SecretsService } from '../home/secrets.service';
import { environment } from '../../environments/environment'

export interface AuthData {
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenTimer: NodeJS.Timer;
  private authStatusListener = new Subject<boolean>();
  isAuth: boolean = false;
  isLoading : boolean = false;
  rootUrl: string = environment.apiUrl + "/auth/"
  private userId: string;

  constructor(private router: Router, private http: HttpClient, private secretService: SecretsService ) { }

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  checkAuth() {
    return this.isAuth;
  }

  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }

  getIsLoading() {
    return this.isLoading;
  }

  login(email: string, password: string) {
    this.isLoading = true;
    const authData: AuthData = {email: email, password: password};
    this.http.post<{token: string, expiresIn: number, userId: string}>(`${this.rootUrl}login`, authData).subscribe(response => {
      console.log(response);
      const token = response.token;
      this.token = token;
      if(token) {
        const expirationInDuration = response.expiresIn;
        this.setAuthTimer(expirationInDuration);
        this.isAuth = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate =  new Date(now.getTime() + expirationInDuration * 1000);
        this.saveAuthData(token, expirationDate, this.userId);
        this.isLoading = false;
        this.router.navigate(['/']);
      }
    })
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuth = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000)
      this.authStatusListener.next(true);
    }
  }

  createUser(email: string, password: string) {
    this.isLoading = true;
    const authData: AuthData = {email: email, password: password};
    this.http.post(`${this.rootUrl}signup`, authData).subscribe(response => {
      console.log(response);
      this.login(email, password);
    })
  }

  logout() {
    this.token = null;
    this.isAuth = false;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer" + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000)
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(!token || !expirationDate) {
      return;
    }

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

 deleteUser(userId: string) {
    this.http.delete(`${this.rootUrl}${userId}`).subscribe(res => {
      console.log(res);
    })
    this.logout();
  }

}
