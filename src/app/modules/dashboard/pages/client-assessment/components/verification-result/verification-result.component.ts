import { Component, output, ViewChild } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import {
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ChartComponent,
  NgApexchartsModule,
} from "ng-apexcharts";

export interface ChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  labels: string[];
  colors: string[];
  datalabels: ApexDataLabels;
  legend: ApexLegend;
}
@Component({
  selector: "app-verification-result",
  standalone: true,
  imports: [MatIcon, NgApexchartsModule],
  templateUrl: "./verification-result.component.html",
  styleUrl: "./verification-result.component.scss",
})
export class VerificationResultComponent {
  @ViewChild("chart") chart!: ChartComponent;
  navigateBack = output();

  recommendations: string[] = [
    "Establish specific credit limits for customer due to her financial health.",
    "Suggest appropriate payment terms, such as shorter payment periods or requiring advance payments, to mitigate the risk of non-payment.",
    "Recommending the use of collateral or guarantees to secure the transaction.",
    "Propose risk mitigation strategies such as credit insurance, hedging, or diversifying the customer base to spread risk.",
  ];
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [20, 30, 30, 20], // Half doughnut data
      chart: {
        type: "donut",
        height: 250,
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 0,
        },
      },
      labels: ["Poor", "Moderate", "Good", "Excellent"],
      colors: ["#FF4D4F", "#FFAA00", "#28C76F", "#009432"],
      datalabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: "left",
        // horizontalAlign: 'right',
        floating: false,
        fontSize: "14px",
        labels: {
          colors: ["#000"],
          useSeriesColors: false,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
    };
  }

  goBack() {
    this.navigateBack.emit();
  }
}
