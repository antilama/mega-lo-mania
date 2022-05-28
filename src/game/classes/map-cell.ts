import {GAME_CONFIG} from '../configuration/globalVars';
import {IArmy} from '../models/army.interface';
import {Player} from '../models/players.type';

type Armies = Record<Player, IArmy>;

export class MapCell {
  // exterior
  public army: Armies;
  public owner: Player | null;

  // exterior buildings
  public tower: boolean;

  // resources
  // TODO

  // tower interior
  public towerScreenPop: number; // integer - on screen val
  public towerRealPop: number; // growth real value

  constructor(
    owner: Player | null = null,
    startingArmy: Armies = {red: {rock: 0}, blue: {rock: 0}},
    towerPresent = false,
    towerPop = 0
  ) {
    this.army = startingArmy;
    this.owner = owner ? owner : null;

    this.tower = towerPresent && owner ? towerPresent : false;

    this.towerRealPop = towerPresent && towerPop ? towerPop : 0;
    this.towerScreenPop = this.calculateScreenTowerPop(this.towerRealPop);
  }

  public growTowerPop(progress: number): void {
    if (!this.tower) {
      return;
    }

    if (this.towerScreenPop >= 2 && this.towerScreenPop < 100) {
      const growth = this.calculateGrowthRate(
        (this.towerScreenPop - (this.towerScreenPop % 2)) / 2,
        progress / 1000
      );

      // increment pop
      this.towerRealPop +=
        growth < GAME_CONFIG.minGrowthTempo
          ? GAME_CONFIG.minGrowthTempo
          : growth;

      this.towerScreenPop = this.calculateScreenTowerPop(this.towerRealPop);
    }
  }

  public resolveStandingArmies(): void {}

  private buildTower(): void {}

  private fight(armies: Armies): Armies {
    return armies;
  }

  private calculateScreenTowerPop = (pop: number): number =>
    pop >= 100 ? 100 : Math.floor(pop);

  private calculateGrowthRate = (
    pairsInPopulation: number,
    percentageOfASecondPassed: number
  ): number =>
    pairsInPopulation *
    GAME_CONFIG.growthTempoPerSecond *
    percentageOfASecondPassed;
}
