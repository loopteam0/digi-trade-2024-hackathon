import { Component, Inject } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MAT_SNACK_BAR_DATA } from "@angular/material/snack-bar";

@Component({
  selector: "app-icon-snackbar",
  standalone: true,
  imports: [MatIcon],
  template: `<div class="flex items-center gap-3">
    <mat-icon style="font-size: 20px; width:20px; height:fit-content;">{{ data.icon }}</mat-icon>
    <p>{{ data.message }}</p>
  </div>`,
})
export class IconSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { icon: string; message: string }) {}
}
