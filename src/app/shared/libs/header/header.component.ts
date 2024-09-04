import { Component, computed, inject, OnInit, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { environment } from "src/environments/environment.development";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../services/storage.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [MatIconModule, MatMenuModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent implements OnInit {
  assetUrl = environment.assetsUrl;
  name = signal<string>("Lawrence Yirenkyi-Boafo");
  auth = inject(AuthService);
  store = inject(StorageService);
  initials = computed(() => {
    return this.name() == undefined
      ? ""
      : this.name()!
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();
  });

  ngOnInit() {
    this.getUserData();
  }

  getUserData() {
    const data = this.store.getItem("userData");
    this.name.set(data!.name);
  }
}
