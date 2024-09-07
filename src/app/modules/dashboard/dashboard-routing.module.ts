import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      {
        path: "overview",
        data: { preload: true },
        loadComponent: () => import("./pages/overview/overview.component").then((m) => m.OverviewComponent),
      },
      {
        path: "client-assessment",
        data: { preload: true },
        loadComponent: () =>
          import("./pages/client-assessment/client-assessment.component").then((m) => m.ClientAssessmentComponent),
      },
      {
        path: "document-verification",
        data: { preload: true },
        loadComponent: () =>
          import("./pages/document-verification/document-verification.component").then(
            (m) => m.DocumentVerificationComponent
          ),
      },
      { path: "", redirectTo: "overview", pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
