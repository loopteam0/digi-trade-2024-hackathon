import { Injectable } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
interface IconModel {
  name: string;
  value: string;
}
@Injectable({
  providedIn: "root",
})
export class IconService {
  icon!: IconModel;
  static readonly SVG_ICONS_PATH = "assets/icons";

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  iconList: IconModel[] = [
    { name: "microsoft", value: `${IconService.SVG_ICONS_PATH}/microsoft.svg` },
    { name: "icn_people_profile", value: `${IconService.SVG_ICONS_PATH}/icn_people_profile.svg` },
    { name: "icn_lock", value: `${IconService.SVG_ICONS_PATH}/icn_lock.svg` },
    { name: "test-1", value: `${IconService.SVG_ICONS_PATH}/button/Floating-1.svg` },
    { name: "test-2", value: `${IconService.SVG_ICONS_PATH}/button/Floating-2.svg` },
    { name: "test-3", value: `${IconService.SVG_ICONS_PATH}/button/Floating-3.svg` },
    { name: "test", value: `${IconService.SVG_ICONS_PATH}/button/Floating.svg` },
    { name: "icn_pencil", value: `${IconService.SVG_ICONS_PATH}/icn_pencil.svg` },
    { name: "upload-image", value: `${IconService.SVG_ICONS_PATH}/upload-image.svg` },
  ];
  register() {
    this.iconList.forEach((icon) => {
      const safeXML = this.sanitizer.bypassSecurityTrustResourceUrl(icon.value);
      this.iconRegistry.addSvgIcon(icon.name, safeXML);
    });
  }
}
