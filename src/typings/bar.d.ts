interface BarMainData {
  settings: {
    axisColor: string,
    axisThickness: number,
    textShow: boolean,
    textSize: number
  }
  contentMeta: {
    [valueType: string]: {
      color: string;
    }
  }
  content: Array<any>
}
