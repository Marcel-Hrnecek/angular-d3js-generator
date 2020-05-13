import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  private readonly DEFAULT_SUNBURST_DATA: MainData = {
    name: "doping",
    show_text: true,
    rotate_text: false,
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
  };

  private sunburstDataSubject: BehaviorSubject<MainData> = new BehaviorSubject(this.DEFAULT_SUNBURST_DATA);
  sunburstData$: Observable<MainData> = this.sunburstDataSubject.asObservable();

  updateSunburstData(newData: MainData) {
    this.sunburstDataSubject.next(newData);
  }
}
