import {GAME_CONFIG} from '../../configuration/globalVars';
import {Player} from '../../models/players.type';
import {MapCellState} from './base-state';
import {Owned} from './owned';

export class Neutral extends MapCellState {
  public handlePopulationGrowth(): void {
    // no population growth without ownership
  }

  public handleStandingArmy(secondPercent: number): void {
    // build only if there is one player on a cell
    if (this.context.armiesPresent.length !== 1) {
      return;
    }

    const PLAYER_ON_CELL: Player = this.context.armiesPresent[0];
    const BUILDERS = this.countBuilders(PLAYER_ON_CELL);

    if (BUILDERS === null) {
      return;
    }

    const BUILDING_PROGRESS = this.buildTower(BUILDERS, secondPercent);

    this.context.towerBuildingProgress += BUILDING_PROGRESS;

    if (this.context.towerBuildingProgress >= 100) {
      this.context.owner = PLAYER_ON_CELL;

      this.context.towerBuildingProgress = 100;
      this.context.transitionTo(new Owned());
    }
  }

  private countBuilders(player: Player): number | null {
    return this.context.armySize(this.context.army[player]);
  }

  private buildTower = (
    builders: number,

    secondPercent: number
  ): number => builders * GAME_CONFIG.buildingTempo * secondPercent;
}
