import {Component, OnInit} from '@angular/core';
import {BarChartDataService} from "../../../services/bar-chart-data.service";

@Component({
  selector: 'app-bar-data-settings',
  templateUrl: './bar-data-settings.component.html',
  styleUrls: ['./bar-data-settings.component.less']
})
export class BarDataSettingsComponent implements OnInit {

  data: BarMainData;
  valueTypes: string[];

  constructor(
    private chartDataService: BarChartDataService
  ) {
  }

  ngOnInit(): void {
    this.chartDataService.barData$
      .subscribe(data => {
        this.data = data;
        this.valueTypes = Object.keys(this.data.contentMeta);
      });
  }

  updateData() {
    this.chartDataService.updateBarData(this.data);
  }

  onRemoveValueType(valueType: string) {

  }

  updateValueTypeName(valueType: string) {

  }

  updateValueTypeColor(valueType: string, color: string) {
    this.data.contentMeta[valueType].color = color;
    this.chartDataService.updateBarData(this.data);
  }

  onAddValueType() {

  }

  onRemoveGroup(idx: number) {

  }

  updateGroupName(idx: number, name: string) {

  }

  updateContentValue(idx: number, valueType: string, value: number) {
    this.data.content[idx][valueType] = value;
    this.chartDataService.updateBarData(this.data);
  }

  onAddGroup() {

  }
}
