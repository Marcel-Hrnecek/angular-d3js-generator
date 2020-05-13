import {Component, OnInit} from '@angular/core';
import {ChartDataService} from "../../services/chart-data.service";

@Component({
  selector: 'app-sunburst-settings',
  templateUrl: './sunburst-settings.component.html',
  styleUrls: ['./sunburst-settings.component.less']
})
export class SunburstSettingsComponent implements OnInit {

  data: MainData;

  constructor(
    private chartDataService: ChartDataService
  ) {
  }

  ngOnInit(): void {
    this.chartDataService.sunburstData$
      .subscribe(data => {
        this.data = data;

      });
  }

  updateData() {
    this.chartDataService.updateSunburstData(this.data);
  }

}
