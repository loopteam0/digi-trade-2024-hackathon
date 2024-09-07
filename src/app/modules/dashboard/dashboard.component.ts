import { Component, inject } from "@angular/core";
import { RouterOutlet, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { HeaderComponent } from "src/app/shared/libs/header/header.component";
import { SharedModule } from "src/app/shared/shared.module";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [HeaderComponent, SharedModule, RouterOutlet, RouterModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.scss",
})
export class DashboardComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  dashboardView: { title: string; routerLink: string }[] = [
    {
      title: "Overview",
      routerLink: "/dashboard/overview",
    },
    {
      title: "Client Assessment",
      routerLink: "/dashboard/client-assessment",
    },
    {
      title: "Document Verification",
      routerLink: "/dashboard/document-verification",
    },
  ];
}
