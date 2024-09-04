import { Component, inject } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { ActivatedRoute, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { PROGRESS_STATE } from "src/app/shared/constants/app.constants";
import { UserData, ISSOResponse, Role } from "src/app/shared/interface/auth.interface";
import { AuthService } from "src/app/shared/services/auth.service";
import { StorageService } from "src/app/shared/services/storage.service";

import { environment } from "src/environments/environment.development";

@Component({
  selector: "app-callback",
  standalone: true,
  imports: [MatProgressSpinner, MatIcon],
  templateUrl: "./callback.component.html",
  styleUrl: "./callback.component.scss",
})
export class CallbackComponent {
  status: PROGRESS_STATE = PROGRESS_STATE.FAILED;
  progress = PROGRESS_STATE;
  assetUrl = environment.assetsUrl;
  router = inject(Router);
  auth = inject(AuthService);
  UserData!: UserData;
  route = inject(ActivatedRoute);
  store = inject(StorageService);
  constructor() {
    this.status = PROGRESS_STATE.LOADING;

    this.route.queryParamMap.subscribe(async (params) => {
      try {
        const token = params.get("sso-token");
        if (token) {
          const userOBj: ISSOResponse = (await new JwtHelperService().decodeToken(token)) as ISSOResponse;

          this.UserData = {
            initials: userOBj.userInfo.firstName.slice(0, 1) + userOBj.userInfo.lastName.slice(0, 1),
            userID: userOBj.userInfo.staffNo,
            token: token,
            apps: (userOBj.userInfo.roles as Role[]).filter((role) => role.app == environment.app),
            email: userOBj.userInfo.email,
            name: `${userOBj.userInfo.firstName} ${userOBj.userInfo.lastName}`,
          };
          this.auth.setUserInfo(this.UserData);
          this.store.setItem("userObj", token);
          this.status = PROGRESS_STATE.DONE;
          this.router.navigateByUrl("/dashboard");
        } else {
          this.status = PROGRESS_STATE.FAILED;
        }
      } catch {
        this.status = PROGRESS_STATE.FAILED;
      }
    });
  }
}
