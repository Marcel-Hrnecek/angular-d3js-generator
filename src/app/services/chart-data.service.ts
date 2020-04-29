import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  private readonly DEFAULT_SUNBURST_DATA = {
    name: "doping",
    children: [
      {
        name: "ano",
        color: '#0ed145',
        color_type: 'yes',
        children: [
          {
            name: "z kondicema",
            value: 11,
            color: '#ff6118',
            color_type: 'no'
          },
          {
            name: "bez kondice",
            value: 12,
            color: '#0ed145',
            color_type: 'yes'
          }
        ]
      },
      {
        name: "ne",
        color: '#ff6118',
        color_type: 'no',
        children: [
          {
            name: "z kondicema",
            value: 27,
            color: '#ff6118',
            color_type: 'no'
          }
        ]
      }
    ]
  };

  private sunburstDataSubject: BehaviorSubject<any> = new BehaviorSubject(this.DEFAULT_SUNBURST_DATA);
  sunburstData$: Observable<any> = this.sunburstDataSubject.asObservable();

  updateSunburstData(newData) {
    this.sunburstDataSubject.next(newData);
  }
}
