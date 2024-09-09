import { NgClass, NgTemplateOutlet } from "@angular/common";
import { ChangeDetectorRef, Component, effect, inject, signal, TemplateRef, ViewChild } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { StorageService } from "src/app/shared/services/storage.service";

interface OverviewData {
  id: number;
  updates: string;
  severity: number;
}
interface ClientData {
  name: string;
  contactPerson: string;
  severity: number;
}
@Component({
  selector: "app-overview",
  standalone: true,
  imports: [NgTemplateOutlet, MatIcon, MatTableModule, MatPaginatorModule, MatMenuModule, NgClass],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.scss",
})
export class OverviewComponent {
  currentView = signal<string>("");
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild("overview") overview!: TemplateRef<unknown>;
  @ViewChild("client") client!: TemplateRef<unknown>;
  overViewColumn = ["updates", "severity", "actions"];
  clientColumn = ["name", "contactPerson", "severity", "actions"];
  name = signal<string>("Lawrence Wood");
  store = inject(StorageService);
  cdr = inject(ChangeDetectorRef);
  selectedTemplate: TemplateRef<unknown> = this.overview;
  dataSource = new MatTableDataSource<any>();
  overViewData: OverviewData[] = [
    {
      id: 1,
      updates: "Kenya has x geopolitical risks. This affects Kasapreko",
      severity: 20,
    },
    {
      id: 2,
      updates: "Client Satisfaction Scores are reducing",
      severity: 98,
    },
    {
      id: 3,
      updates: "New trade routes recommended for Miss Cookie",
      severity: 40,
    },
    {
      id: 4,
      updates: "Kenya has x geopolitical risks. This affects Kasapreko",
      severity: 68,
    },
    {
      id: 5,
      updates: "Goldfields LC has valid issues",
      severity: 24,
    },
    {
      id: 6,
      updates: "New trade routes recommended for Kasapreko",
      severity: 80,
    },
    {
      id: 7,
      updates: "New trade routes recommended for Miss Cookie",
      severity: 40,
    },
    {
      id: 8,
      updates: "Kenya has x geopolitical risks. This affects Kasapreko",
      severity: 80,
    },
    {
      id: 9,
      updates: "Goldfields LC has valid issues",
      severity: 20,
    },
    {
      id: 10,
      updates: "New trade routes recommended for Kasapreko",
      severity: 10,
    },
  ];
  clientData: ClientData[] = [
    {
      name: "MasterCard",
      contactPerson: "Nana Ama E.Aidoo - Taylor",
      severity: 20,
    },
    {
      name: "The Walt Disney Company",
      contactPerson: "Kacy Mark Bartlett",
      severity: 98,
    },
    {
      name: "Johnson & Johnson",
      contactPerson: "George Plange",
      severity: 40,
    },
    {
      name: "Loreal",
      contactPerson: "Juan Lodonu",
      severity: 40,
    },
    {
      name: "Sony",
      contactPerson: "Lawrence Boafo",
      severity: 80,
    },
    {
      name: "IBM",
      contactPerson: "Nate Ofori",
      severity: 20,
    },
    {
      name: "Mitsubishi",
      contactPerson: "Mitsubishi",
      severity: 10,
    },
    {
      name: "Gillette",
      contactPerson: "Estelle Asare",
      severity: 40,
    },
    {
      name: "Facebook",
      contactPerson: "Keith Asare",
      severity: 80,
    },
  ];

  constructor() {
    this.getUserData();
    this.currentView.set("Overview");
    effect(() => {
      console.log(this.currentView());
      switch (this.currentView()) {
        case "Overview":
          this.cdr.detectChanges();
          this.dataSource = new MatTableDataSource(this.overViewData);
          this.selectedTemplate = this.overview;
          if (this.selectedTemplate === this.overview && this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
          break;
        case "Clients":
          this.cdr.detectChanges();
          this.selectedTemplate = this.client;
          if (this.selectedTemplate === this.client && this.paginator) {
            this.dataSource = new MatTableDataSource(this.clientData);
            this.dataSource.paginator = this.paginator;
          }
      }
    });
  }
  overviewData = [
    {
      icon: "test",
      value: "89%",
      title: "Client Satisfaction Score",
    },
    {
      icon: "test-1",
      value: "145%",
      title: " Benefit Realization Impact",
    },
    {
      icon: "test-2",
      value: 62,
      title: "Total Credit Assessments",
    },
    {
      icon: "test-3",
      value: " 30 days",
      title: "Average Trade Document Process Time",
    },
  ];
  getUserData() {
    const data = this.store.getItem("userData");
    if (!data) {
      return;
    } else { this.name.set(data!.name); }

  }

  changeView(view: string) {
    this.currentView.set(view);
  }
}
