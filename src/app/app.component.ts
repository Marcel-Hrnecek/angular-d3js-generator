import {Component} from '@angular/core';
import {ChartStorageService} from "./services/chart-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'd3js-generator';

  constructor(
    private chartStorageService: ChartStorageService
  ) {
    chartStorageService.init();
  }
}
