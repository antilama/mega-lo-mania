import {MapCell} from '../map-cell';

export abstract class MapCellState {
  protected context!: MapCell;

  public setContext(context: MapCell) {
    this.context = context;
  }

  public abstract handleStandingArmy(secondPercent: number): void;
  public abstract handlePopulationGrowth(secondPercent: number): void;
}
