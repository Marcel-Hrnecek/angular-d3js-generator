import {Component} from '@angular/core';
import {ChartDataService} from "../../services/chart-data.service";
import {ChartStorageService} from "../../services/chart-storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-data-storage',
  templateUrl: './data-storage.component.html',
  styleUrls: ['./data-storage.component.less']
})
export class DataStorageComponent {

  constructor(
    public chartStorageService: ChartStorageService,
    private chartDataService: ChartDataService,
    private snackBar: MatSnackBar
  ) {
  }

  onNew() {
    this.chartStorageService.createNew();
  }

  onSave() {
    this.chartStorageService.save();
    this.snackBar.open('Saved!', null, {duration: 1000});
  }

  onDelete() {
    this.chartStorageService.delete();
  }

  loadData(storedData: MainData) {
    this.chartStorageService.load(storedData);
  }
}
