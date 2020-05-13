interface MainData {
  name: string,
  show_text: boolean,
  rotate_text: boolean,
  inner_opacity: number,
  children: ChildData[]
}

interface ChildData {
  name: string,
  color: string,
  color_from_parent?: boolean,
  order: number,
  value?: number,
  children?: ChildData[]
}
