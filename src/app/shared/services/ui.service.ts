import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ComponentType } from "@angular/cdk/portal";
import { IconSnackbarComponent } from "../libs/icon-snackbar/icon-snackbar.component";

export enum SnackbarType {
  error = "error-snackbar",
  success = "success-snackbar",
  info = "info-snackbar",
}
@Injectable({
  providedIn: "root",
})
export class UiService {
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  icon!: string;

  openDialog(component: ComponentType<unknown>, config?: MatDialogConfig) {
    return this.dialog.open(component, {
      ...config,
    });
  }

  showSnackbar(message: string, type: SnackbarType = SnackbarType.info, duration?: number) {
    return this.snackBar.open(message, undefined, {
      duration: duration || 5000,
      panelClass: [type],
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }
  showSnackBarWithIcon(message: string, type: SnackbarType = SnackbarType.info, duration?: number) {
    if (type == SnackbarType.success) {
      this.icon = "check_circle_outline";
    } else if (type == SnackbarType.error) {
      this.icon = "warning_outline";
    } else {
      this.icon = "info_outline";
    }
    return this.snackBar.openFromComponent(IconSnackbarComponent, {
      data: { icon: this.icon, message },
      duration: duration || 5000,
      panelClass: [type],
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  closeDialog(id?: string) {
    if (id) {
      this.dialog.getDialogById(id)?.close();
    } else {
      this.dialog.closeAll();
    }
  }
}
