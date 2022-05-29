import {GAME_CONFIG} from '../configuration/globalVars';
import {IArmy} from '../models/army.interface';
import {Player} from '../models/players.type';
import {MapCellState} from './mapcell-states/base-state';
import {Neutral} from './mapcell-states/neutral';
import {Owned} from './mapcell-states/owned';

type Armies = {[P in Player]?: IArmy};

export class MapCell {
  private state!: MapCellState;

  // armies
  public army: Armies;

  // exterior
  public owner: Player | null;
  public towerBuildingProgress: number;
  private builder: Player | null = null;

  // resources

  // tower interior
  public towerScreenPop: number; // integer - on screen val
  public towerRealPop: number; // growth real value

  constructor(
    owner: Player | null = null,
    startingArmy: Armies = {},
    towerPresent = false,
    towerPop = 0
  ) {
    this.owner = owner ? owner : null;
    this.state = owner ? new Owned() : new Neutral();
    this.transitionTo(this.state);

    this.army = startingArmy;

    this.towerBuildingProgress = this.owner ? 100 : 0;

    this.towerRealPop = towerPresent && towerPop ? towerPop : 0;
    this.towerScreenPop = this.towerRealPop;
  }

  public transitionTo(state: MapCellState): void {
    console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  public resolvePopulationGrowth(progress: number): void {
    this.state.handlePopulationGrowth(this.percentageOfASecondPassed(progress));
  }

  public resolveStandingArmy(progress: number): void {
    this.state.handleStandingArmy(this.percentageOfASecondPassed(progress));
  }

  private percentageOfASecondPassed = (progress: number): number =>
    progress / 1000;

  private buildTower = (
    builders: number,
    percentageBuilt: number,
    percentageOfASecondPassed: number
  ): number =>
    percentageBuilt +
    builders * GAME_CONFIG.buildingTempo * percentageOfASecondPassed;

  private isOwned = (): boolean => (this.owner ? true : false);
  private thereIsConflict = (): boolean =>
    Object.keys(this.army).length > 1 ? true : false;
}
