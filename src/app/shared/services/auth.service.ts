import { effect, inject, Injectable, signal } from "@angular/core";
import { StorageService } from "./storage.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import { UserInfo, ISSOResponse, UserData } from "../interface/auth.interface";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  store = inject(StorageService);
  router = inject(Router);
  jwtHelper = inject(JwtHelperService);
  private _userInfo = signal<UserData | null>(this.store.getItem("userData"));

  get userInfo() {
    return this._userInfo();
  }
  constructor() {
    effect(async () => {
      const info = this._userInfo();
      if (!info) {
        this.store.removeItem("userData");
      } else {
        if (this.store.check("userData")) {
          this.store.removeItem("userData");
        }
        this.store.setItem("userData", info, "/");
      }
    });
  }
  getUserRole() {
    if (this.userInfo) {
      return this.userInfo.apps[0].role;
    }
    return;
  }

  /**
   * Saves the user data to the browser cookies
   * @param userData - the user data to be set
   */
  setUserInfo(userData: UserData | null) {
    this._userInfo.set(userData);
  }
  /**
   * @param token - the token to be decoded
   * @returns ISSOResponse | null - returns the decoded token
   */
  decodeToken(token: string): ISSOResponse | null {
    const decodedToken: ISSOResponse | null = this.jwtHelper.decodeToken(token);
    return decodedToken;
  }

  /**
   * Checks if the user is authenticated by checking if the token is expired
   * @returns boolean - returns true if the user is authenticated
   */
  public isAuthenticated(): boolean {
    const payload = this.store.getItem("userData") as UserInfo;
    if (!payload.token) return false;
    return !this.jwtHelper.isTokenExpired(payload.token);
  }

  /**
   * Removes a token from the this.store
   */
  logout() {
    this.setUserInfo(null);
    this.store.removeItem("userData");
    this.store.removeItem("currentUser");
    this.store.deleteAll();
  }

  /**
   * Saves a User token to the this.store
   * @param token - the users token
   */
  saveUserToken(token: string) {
    if (!this.jwtHelper.isTokenExpired(token)) {
      this.store.setItem("currentUser", token);
      return true;
    }
    return false;
  }

  /**
   * Returns the current user token
   * @returns string - returns a  user token
   */
  getCurrentToken() {
    const token = this.store.getItem("currentUser");
    return token || null;
  }
}
