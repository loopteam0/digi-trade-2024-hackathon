import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { IconService } from "./shared/services/icon.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "digiTrade";
  constructor(private iconService: IconService) {
    this.iconService.register();
  }
}
