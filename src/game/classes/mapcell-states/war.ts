import {MapCellState} from './base-state';

export class War extends MapCellState {
  public handlePopulationGrowth(secondPercent: number): void {
    throw new Error('Method not implemented.');
  }
  public handleStandingArmy(secondPercent: number): void {
    console.warn('WAR, pending implementation');

    // fight
    // when won transition to NEUTRAL or OWNED
  }
}
