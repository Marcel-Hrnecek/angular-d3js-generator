import {Component, Input} from '@angular/core';
import {BarChartDataService} from "../../../services/bar-chart-data.service";

@Component({
  selector: 'app-bar-settings',
  templateUrl: './bar-settings.component.html',
  styleUrls: ['./bar-settings.component.less']
})
export class BarSettingsComponent {

  @Input()
  data: BarMainData;

  constructor(
    public dataService: BarChartDataService
  ) {
  }

  updateData() {
    this.dataService.updateBarData(this.data);
  }

}
