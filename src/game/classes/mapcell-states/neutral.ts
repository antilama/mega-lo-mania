import {MapCellState} from './base-state';

export class Neutral extends MapCellState {
  public handlePopulationGrowth(secondPercent: number): void {
    // no population growth without ownership
  }

  public handleStandingArmy(secondPercent: number): void {
    // build
    // when done transition to OWNED
  }
}
