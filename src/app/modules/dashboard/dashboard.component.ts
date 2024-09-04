import { Component, signal } from "@angular/core";
import { RouterOutlet, RouterModule } from "@angular/router";
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
  dashboardView = [
    {
      title: "Overview",
      routerLink: "/overview",
    },
    {
      title: "Client Assessment",
      routerLink: "/client-assessment",
    },
    {
      title: "Document Verification",
      routerLink: "/document-verification",
    },
  
  ]
  currentView= signal<string>('Overview');

  changeView(view: string) {
    this.currentView.set(view);
  }

}
