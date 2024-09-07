import { Component, inject, input, output } from "@angular/core";
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ImageProps, UploadItemComponent } from "./upload-item/upload-item.component";

@Component({
  selector: "app-verify-document",
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatFormFieldModule,
    MatInput,
    MatSelectModule,
    UploadItemComponent,
  ],
  templateUrl: "./verify-document.component.html",
  styleUrl: "./verify-document.component.scss",
})
export class VerifyDocumentComponent {
  id = input<number>(NaN, { alias: "clientId" });
  uploadedDocs: ImageProps[] = [];
  fileVerified = output<boolean>();

  fb = inject(NonNullableFormBuilder);
  documentInfo = this.fb.group({
    docType: ["", Validators.required],
    bank: ["", Validators.required],
    country: ["", Validators.required],
    documents: [this.uploadedDocs],
  });
  submit() {
    if (this.uploadedDocs.length > 0) {
      this.fileVerified.emit(true);
    }
  }
  goBack() {
    this.fileVerified.emit(false);
  }
  addToDocs(data: ImageProps[]) {
    this.uploadedDocs = data;
  }
}
