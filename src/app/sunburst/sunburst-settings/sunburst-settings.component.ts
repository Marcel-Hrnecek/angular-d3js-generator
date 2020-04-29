import {Component, OnInit} from '@angular/core';
import {ChartDataService} from "../../services/chart-data.service";

@Component({
  selector: 'app-sunburst-settings',
  templateUrl: './sunburst-settings.component.html',
  styleUrls: ['./sunburst-settings.component.less']
})
export class SunburstSettingsComponent implements OnInit {

  data: any;
  yes_color: string;
  no_color: string;
  real_ano_value: number;

  constructor(
    private chartDataService: ChartDataService
  ) {
  }

  ngOnInit(): void {
    this.chartDataService.sunburstData$
      .subscribe(data => {
        this.data = data;
        this.yes_color = this.data.children[0].color;
        this.no_color = this.data.children[1].color;
        this.real_ano_value = this.data.children[0].children[1].value;

      });
  }

  updateData() {
    this.chartDataService.updateSunburstData(this.data);
  }

  updateYesColor(newColor: string) {
    this.updateColorData(this.data, newColor, 'yes');
    this.updateData();
  }

  updateNoColor(newColor: string) {
    this.updateColorData(this.data, newColor, 'no');
    this.updateData();
  }

  private updateColorData(data, newColor: string, type: string) {
    data.children.forEach(dataPoint => {
      if (dataPoint.color_type === type) {
        dataPoint.color = newColor;
      }
      if (dataPoint.children) {
        this.updateColorData(dataPoint, newColor, type);
      }
    });
  }

  updateRealAnoValue(anoValue: number) {
    this.data.children[0].children[1].value = anoValue;
    this.updateData();
  }
}
