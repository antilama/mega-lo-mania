import {GAME_CONFIG} from '../../configuration/globalVars';
import {MapCellState} from './base-state';

export class Owned extends MapCellState {
  public handlePopulationGrowth(secondPercent: number): void {
    if (this.context.towerScreenPop >= 2 && this.context.towerScreenPop < 100) {
      const GROWTH = this.calculateGrowthRate(
        (this.context.towerScreenPop - (this.context.towerScreenPop % 2)) / 2,
        secondPercent
      );

      // increment pop
      this.context.towerRealPop +=
        GROWTH < GAME_CONFIG.minGrowthTempo
          ? GAME_CONFIG.minGrowthTempo
          : GROWTH;

      this.context.towerScreenPop = this.calculateScreenTowerPop(
        this.context.towerRealPop
      );
    }
  }

  public handleStandingArmy(): void {
    // no operation
  }

  private calculateGrowthRate = (
    pairsInPopulation: number,
    secondPercent: number
  ): number =>
    pairsInPopulation * GAME_CONFIG.growthTempoPerSecond * secondPercent;

  private calculateScreenTowerPop = (pop: number): number =>
    pop >= 100 ? 100 : Math.floor(pop);
}
