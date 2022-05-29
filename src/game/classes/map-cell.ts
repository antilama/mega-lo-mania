import {GAME_CONFIG} from '../configuration/globalVars';
import {IArmy} from '../models/army.interface';
import {Player} from '../models/players.type';
import {MapCellState} from './mapcell-states/base-state';
import {Neutral} from './mapcell-states/neutral';
import {Owned} from './mapcell-states/owned';
import {War} from './mapcell-states/war';

type Armies = {[P in Player]: IArmy | null};

export class MapCell {
  private state!: MapCellState;

  // armies
  public army: Armies;
  public armiesPresent: Player[];

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
    startingArmy: Armies = {red: null, blue: null},
    towerPresent = false,
    towerPop = 0
  ) {
    this.owner = owner ? owner : null;
    this.state = owner ? new Owned() : new Neutral();
    this.transitionTo(this.state);

    this.army = startingArmy;
    this.armiesPresent = [];

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
    this.state.handlePopulationGrowth(progress);
  }

  public resolveStandingArmy(progress: number): void {
    this.armiesPresent = this.getArmiesPresent(this.army);

    if (this.armiesPresent.length > 1) {
      this.transitionTo(new War());
    }

    this.state.handleStandingArmy(progress);
  }

  public armySize = (army: IArmy | null): number | null => {
    if (army === null) {
      return null;
    }

    const SUM = army.rock * GAME_CONFIG.unitWeights.rock;
    return SUM > 0 ? SUM : null;
  };

  private getArmiesPresent = (armies: Armies): Player[] => {
    const PRESENT: Player[] = [];

    Object.values(Player).forEach(key => {
      if (this.armySize(armies[key]) !== null) {
        PRESENT.push(key);
      }
    });

    return PRESENT;
  };

  private isOwned = (): boolean => (this.owner ? true : false);
}
