export type Map = MapCell[];

export interface MapCell {
  pop: number; // integer - on screen val
  modelPop: number; // growth real value
}
