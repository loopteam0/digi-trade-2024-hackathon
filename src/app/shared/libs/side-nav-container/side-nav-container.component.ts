import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-side-nav-container",
  templateUrl: "./side-nav-container.component.html",
  styleUrls: ["./side-nav-container.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SideNavContainerComponent {
  @Input() isMobile = false;
  @Input() opened = false;
}
