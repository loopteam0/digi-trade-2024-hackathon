import { Routes } from "@angular/router";

export const routes: Routes = [
  { path: "", redirectTo: "signIn", pathMatch: "full" },
  { path: "signIn", loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule) },
  {
    path: "dashboard",
    loadChildren: () => import("./modules/dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
];
