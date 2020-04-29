import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  private readonly DEFAULT_SUNBURST_DATA = {
    name: "doping",
    show_text: true,
    rotate_text: false,
    children: [
      {
        name: "ano",
        color: '#0ed145',
        color_type: 'yes',
        order: 2,
        children: [
          {
            name: "z kondicema",
            value: 11,
            color: '#ff6118',
            color_type: 'no',
            order: 1
          },
          {
            name: "bez kondice",
            value: 12,
            color: '#0ed145',
            color_type: 'yes',
            order: 2
          }
        ]
      },
      {
        name: "ne",
        color: '#ff6118',
        color_type: 'no',
        order: 1,
        children: [
          {
            name: "z kondicema",
            value: 27,
            color: '#ff6118',
            color_type: 'no',
            order: 1
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
