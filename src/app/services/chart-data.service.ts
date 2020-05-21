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
  };

  private sunburstDataSubject: BehaviorSubject<MainData> = new BehaviorSubject(this.DEFAULT_SUNBURST_DATA);
  sunburstData$: Observable<MainData> = this.sunburstDataSubject.asObservable();

  updateSunburstData(newData: MainData) {
    this.sunburstDataSubject.next(newData);
  }

  addMainData() {
    const currentData: MainData = this.sunburstDataSubject.getValue();
    const defaultChild = ChartDataService.createDefaultChild();

    const newParentData: ChildData = {
      name: 'NEW DATA MAIN',
      color: '#3f51b5',
      value: 5,
      children: [],
      order: ChartDataService.getNextOrderValue(currentData.children)
    };

    currentData.children.push(newParentData);
    this.sunburstDataSubject.next(currentData);
  }

  addChildData(parentIdx: number) {
    const currentData: MainData = this.sunburstDataSubject.getValue();
    const parentData = currentData.children[parentIdx];

    const defaultChild = ChartDataService.createDefaultChild();
    defaultChild.order = ChartDataService.getNextOrderValue(parentData.children);
    defaultChild.color = parentData.color;

    if (parentData.children.length === 0) {
      defaultChild.value = parentData.value;
      parentData.value = 0;
    }

    parentData.children.push(defaultChild);
    this.sunburstDataSubject.next(currentData);
  }

  removeMainData(idx: number) {
    const currentData: MainData = this.sunburstDataSubject.getValue();
    currentData.children.splice(idx, 1);
    this.sunburstDataSubject.next(currentData);
  }

  removeChildData(parentIdx: number, idx: number) {
    const currentData: MainData = this.sunburstDataSubject.getValue();
    const parentData = currentData.children[parentIdx];

    const removedChild = parentData.children.splice(idx, 1)[0];
    if (parentData.children.length === 0) {
      parentData.value = removedChild.value;
    }
    this.sunburstDataSubject.next(currentData);
  }

  private static createDefaultChild() {
    return {
      name: 'NEW DATA CHILD',
      value: 5,
      order: 1,
      color: '#3f51b5',
      color_from_parent: true
    };
  }

  private static getNextOrderValue(children: ChildData[]): number {
    const currentMaxOrder = children.reduce((maxValue, child) => {
      return maxValue < child.order ? child.order : maxValue
    }, 0);
    return currentMaxOrder + 1;
  }
}
