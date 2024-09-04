import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  constructor(private cookies: CookieService) {}

  setItem(key: string, data: object | string | boolean | number, path?: string) {
    return this.cookies.set(key, JSON.stringify(data), undefined, path, undefined, true);
  }

  getItem(key: string) {
    const x = this.cookies.get(key);

    if (x) {
      return JSON.parse(x);
    } else {
      return null;
    }
  }

  removeItem(key: string) {
    return this.cookies.delete(key);
  }

  deleteAll() {
    return this.cookies.deleteAll();
  }

  check(key: string) {
    return this.cookies.check(key);
  }
}
