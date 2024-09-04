import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { CallbackComponent } from "./callback/callback.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "callback",
    component: CallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
