import { Component, inject, input, output } from "@angular/core";
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { ImageProps, UploadItemComponent } from "./upload-item/upload-item.component";

export interface DocumentInfo {
  docType: string;
  bank: string;
  country: string;
  documents: ImageProps[];
}
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
  fileVerified = output<DocumentInfo | null>();

  fb = inject(NonNullableFormBuilder);
  documentInfo = this.fb.group({
    docType: ["", Validators.required],
    bank: ["", Validators.required],
    country: ["", Validators.required],
    documents: [this.uploadedDocs],
  });
  submit() {
    if (this.uploadedDocs.length > 0) {
      const data: DocumentInfo = {
        docType: this.documentInfo.value.docType as string,
        bank: this.documentInfo.value.bank as string,
        country: this.documentInfo.value.country as string,
        documents: this.uploadedDocs,
      };
      this.fileVerified.emit(data);
    }
  }
  goBack() {
    this.fileVerified.emit(null);
  }
  addToDocs(data: ImageProps[]) {
    this.uploadedDocs = data;
  }
}
