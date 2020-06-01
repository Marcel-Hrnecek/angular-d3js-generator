import {Component, OnDestroy, OnInit} from '@angular/core';
import {BarChartDataService} from "../../services/bar-chart-data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.less']
})
export class BarComponent implements OnInit, OnDestroy {

  data: BarMainData;

  private subscription: Subscription;

  constructor(
    private chartDataService: BarChartDataService
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.chartDataService.barData$
      .subscribe(data => {
        this.data = data;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
