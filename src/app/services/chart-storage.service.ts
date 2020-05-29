import {Injectable} from "@angular/core";
import {ChartDataService} from "./chart-data.service";

@Injectable({
  providedIn: 'root'
})
export class ChartStorageService {

  private static readonly STORAGE_KEY = 'CHART_DATA';

  private static get DEFAULT_DATA(): MainData {
    return {
      name: "default",
      show_text: true,
      rotate_text: false,
      text_size: 10,
      text_color: '#FFFFFF',
      inner_opacity: 60,
      children: [
        {
          name: "yes",
          color: '#0ed145',
          order: 2,
          children: [
            {
              name: "with conditions",
              value: 11,
              color: '#ff6118',
              color_from_parent: false,
              order: 1
            },
            {
              name: "no conditions",
              value: 12,
              color: '#0ed145',
              color_from_parent: true,
              order: 2
            }
          ]
        },
        {
          name: "no",
          color: '#ff6118',
          order: 1,
          children: [
            {
              name: "with conditions",
              value: 27,
              color: '#ff6118',
              color_from_parent: true,
              order: 1
            }
          ]
        }
      ]
    }
  };

  storedData: MainData[];
  currentDataName: string;

  constructor(
    private chartDataService: ChartDataService
  ) {
  }

  init() {
    this.storedData = JSON.parse(localStorage.getItem(ChartStorageService.STORAGE_KEY));
    if (!this.storedData) {
      this.storedData = [ChartStorageService.DEFAULT_DATA];
    }
    // TODO: Something smarter, like last edited chart.
    this.chartDataService.updateSunburstData(JSON.parse(JSON.stringify(this.storedData[0])));
    this.currentDataName = this.storedData[0].name;
  }

  load(data: MainData) {
    const storedData = this.storedData.find(value => value.name === data.name);
    this.currentDataName = storedData.name;
    this.chartDataService.updateSunburstData(JSON.parse(JSON.stringify(storedData)));
  }

  createNew() {
    this.currentDataName = ChartStorageService.DEFAULT_DATA.name;
    this.chartDataService.updateSunburstData(ChartStorageService.DEFAULT_DATA);
  }

  save() {
    const currentData = this.chartDataService.getCurrentData();
    const idx = this.storedData.findIndex(value => value.name === this.currentDataName);
    if (idx !== -1) {
      this.storedData[idx] = currentData;
    } else {
      currentData.name = this.currentDataName;
      this.storedData.push(currentData);
    }
    localStorage.setItem(ChartStorageService.STORAGE_KEY, JSON.stringify(this.storedData));
  }

  delete() {
    const idx = this.storedData.findIndex(value => value.name === this.currentDataName);
    if (idx !== -1) {
      this.storedData.splice(idx, 1);
    }
    localStorage.setItem(ChartStorageService.STORAGE_KEY, JSON.stringify(this.storedData));

    const loadedData: MainData = this.storedData.length === 0 ?
      JSON.parse(JSON.stringify(ChartStorageService.DEFAULT_DATA))
      :
      JSON.parse(JSON.stringify(this.storedData[0]));

    this.currentDataName = loadedData.name;
    this.chartDataService.updateSunburstData(loadedData);
  }
}
