import { Component, inject } from "@angular/core";
import { MatRipple } from "@angular/material/core";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.development";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [MatIcon, MatRipple, MatProgressSpinner],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  assetUrl = environment.assetsUrl;
  router = inject(Router);
  isLoading = false;
  redirect() {
    const url = window.location.href + "/callback";
    const sourceCode = encodeURIComponent(environment.app);

    const result = url;
    const genUrl =
      environment.ssoUrl +
      "/param-login?url=" +
      result +
      "&source-code=" +
      sourceCode +
      "&client-type=" +
      environment.clientType +
      "&custom-authentication=" +
      environment.customAuthentication +
      "&set-cookie=" +
      environment.setCookie;
    window.location.href = genUrl;
    this.isLoading = true;
  }
}
