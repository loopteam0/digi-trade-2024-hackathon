import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DashboardContainerComponent } from "./libs/dashboard-container/dashboard-container.component";
import { DashboardContentContainerComponent } from "./libs/dashboard-content-container/dashboard-content-container.component";
import { SideNavContainerComponent } from "./libs/side-nav-container/side-nav-container.component";
import { MainContentContainerComponent } from "./libs/main-content-container/main-content-container.component";

@NgModule({
  declarations: [
    DashboardContainerComponent,
    DashboardContentContainerComponent,
    SideNavContainerComponent,
    MainContentContainerComponent,
  ],
  imports: [CommonModule],
  exports: [
    DashboardContainerComponent,
    DashboardContentContainerComponent,
    SideNavContainerComponent,
    MainContentContainerComponent,
  ],
})
export class SharedModule {}
