import { Component, inject } from "@angular/core";
import { VerificationResultComponent } from "../client-assessment/components/verification-result/verification-result.component";
import { VerifyDocumentComponent } from "../client-assessment/components/verify-document/verify-document.component";
import { Router } from "@angular/router";
enum PAGESTATES {
  VERIFY_DOCUMENTS = 1,
  VERIFICATION_RESULTS = 2,
}
@Component({
  selector: "app-document-verification",
  standalone: true,
  imports: [VerificationResultComponent, VerifyDocumentComponent],
  templateUrl: "./document-verification.component.html",
  styleUrl: "./document-verification.component.scss",
})
export class DocumentVerificationComponent {
  status: PAGESTATES = PAGESTATES.VERIFY_DOCUMENTS;
  progress = PAGESTATES;
  router = inject(Router);
  id!: number;

  isDataSubmitted(data: boolean) {
    if (data) {
      this.status = PAGESTATES.VERIFICATION_RESULTS;
    } else {
      this.toDashboard();
    }
  }
  toDashboard() {
    this.router.navigate(["/dashboard"]);
  }
}
