import { AfterViewInit, Component, inject, signal, ViewChild } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Router } from "@angular/router";
import { VerificationResultComponent } from "./components/verification-result/verification-result.component";
import { DocumentInfo, VerifyDocumentComponent } from "./components/verify-document/verify-document.component";
import { NgTemplateOutlet } from "@angular/common";

interface ClientData {
  id: number;
  name: string;
  countryOfOrigin: string;
  cif: string;
}
enum PAGESTATES {
  DASHBOARD = 1,
  VERIFY_DOCUMENTS = 2,
  VERIFICATION_RESULTS = 3,
}
@Component({
  selector: "app-client-assessment",
  standalone: true,
  imports: [
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatIcon,
    VerificationResultComponent,
    VerifyDocumentComponent,
    NgTemplateOutlet,
  ],
  templateUrl: "./client-assessment.component.html",
  styleUrl: "./client-assessment.component.scss",
})
export class ClientAssessmentComponent implements AfterViewInit {
  currentView = signal<string>("Client Assessment");
  clientColumn = ["name", "countryOfOrigin", "cif", "actions"];
  dataSource = new MatTableDataSource<any>();
  router = inject(Router);
  status: PAGESTATES = PAGESTATES.DASHBOARD;
  progress = PAGESTATES;
  id!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  clientData: ClientData[] = [
    { id: 1, name: "MasterCard", countryOfOrigin: "Brazil", cif: "10401054746" },
    { id: 2, name: "The Walt Disney Company", countryOfOrigin: "South Africa", cif: "10400282440" },
    { id: 3, name: "Johnson & Johnson", countryOfOrigin: "Afghanistan", cif: "10400267825" },
    { id: 4, name: "Loreal", countryOfOrigin: "Curaçao", cif: "10401054746" },
    { id: 5, name: "Sony", countryOfOrigin: "Central African Republic", cif: "10400282440" },
    { id: 6, name: "IBM", countryOfOrigin: "Pakistan", cif: "10401054746" },
    { id: 7, name: "Mitsubishi", countryOfOrigin: "Tajikistan", cif: "10400282440" },
    { id: 8, name: "Gillette", countryOfOrigin: "Algeria", cif: "10401054746" },
    { id: 9, name: "Facebook", countryOfOrigin: "Sao Tome and Principe", cif: "10400282440" },
    { id: 10, name: "Coca-Cola", countryOfOrigin: "Togo", cif: "10401054746" },
  ];

  goTo(id: number) {
    this.id = id;
    this.status = PAGESTATES.VERIFY_DOCUMENTS;
  }
  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.clientData);
    this.dataSource.paginator = this.paginator;
  }
  isDataSubmitted(data: DocumentInfo | null) {
    if (data) {
      this.status = PAGESTATES.VERIFICATION_RESULTS;
    } else {
      this.toDashboard();
    }
  }
  toDashboard() {
    this.status = PAGESTATES.DASHBOARD;
  }
}
