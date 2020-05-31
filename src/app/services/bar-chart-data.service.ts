import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BarChartDataService {

  data: BarMainData = {
    contentMeta: {
      yes: {
        color: '#0ed145'
      },
      no: {
        color: '#ff6118'
      }
    },
    content: [
      {group: 'female', yes: 10, no: 5},
      {group: 'male', yes: 25, no: 15},
      {group: 'all', yes: 35, no: 20}
    ]
  };

  private barDataSubject: BehaviorSubject<BarMainData> = new BehaviorSubject(this.data);
  barData$: Observable<BarMainData> = this.barDataSubject.asObservable();

  updateBarData(data: BarMainData) {
    this.barDataSubject.next(data);
  }
}
