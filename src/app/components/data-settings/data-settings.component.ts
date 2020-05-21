import {Component, OnInit} from '@angular/core';
import {ChartDataService} from "../../services/chart-data.service";

@Component({
  selector: 'app-data-settings',
  templateUrl: './data-settings.component.html',
  styleUrls: ['./data-settings.component.less']
})
export class DataSettingsComponent implements OnInit {

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

  updateColor(newColor: string, index: number) {
    const toUpdate = this.data.children[index];
    toUpdate.color = newColor;
    if (toUpdate.children) {
      toUpdate.children.forEach(child => {
        if (child.color_from_parent) {
          child.color = newColor;
        }
      });
    }

    this.updateData();
  }

  toggleColorFromParent(useColorFromParent: boolean, parentIdx: number, selfIdx: number) {
    this.data.children[parentIdx].children[selfIdx].color_from_parent = useColorFromParent;
    if (useColorFromParent) {
      this.data.children[parentIdx].children[selfIdx].color = this.data.children[parentIdx].color;
    }

    this.updateData();
  }

  onAddMainData() {
    this.chartDataService.addMainData();
  }

  onAddChildData(parentIdx: number) {
    this.chartDataService.addChildData(parentIdx);
  }

  onRemoveMainData(idx: number) {
    this.chartDataService.removeMainData(idx);
  }

  onRemoveChildData(parentIdx: number, idx: number) {
    this.chartDataService.removeChildData(parentIdx, idx);
  }
}
