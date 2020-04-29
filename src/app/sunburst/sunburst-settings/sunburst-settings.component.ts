import {Component, OnInit} from '@angular/core';
import {ChartDataService} from "../../services/chart-data.service";

@Component({
  selector: 'app-sunburst-settings',
  templateUrl: './sunburst-settings.component.html',
  styleUrls: ['./sunburst-settings.component.less']
})
export class SunburstSettingsComponent implements OnInit {

  data: any;
  ano_color: string;
  real_ano_value: number;

  constructor(
    private chartDataService: ChartDataService
  ) {
  }

  ngOnInit(): void {
    this.chartDataService.sunburstData$
      .subscribe(data => {
        this.data = data;
        this.ano_color = this.data.children[0].color;
        this.real_ano_value = this.data.children[0].children[1].value;

      });
  }

  updateData() {
    this.chartDataService.updateSunburstData(this.data);
  }

  updateYesColor(newColor: string) {
    this.updateYesColorData(this.data, newColor);
    this.updateData();
  }

  private updateYesColorData(data, newColor: string) {
    data.children.forEach(dataPoint => {
      if (dataPoint.color_type === 'yes') {
        dataPoint.color = newColor;
      }
      if (dataPoint.children) {
        this.updateYesColorData(dataPoint, newColor);
      }
    });
  }

  updateRealAnoValue(anoValue: number) {
    this.data.children[0].children[1].value = anoValue;
    this.updateData();
  }
}
