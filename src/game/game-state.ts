import {Map} from './models/map.type';

export class GameState {
  private static instance: GameState;

  private map: Map = [];

  private constructor() {}

  setMapState(updatedMap: Map): void {
    this.map = updatedMap;
  }

  mapState(): Map {
    return this.map;
  }

  updateMapModel(progress: number): void {
    const updatedMap: Map = [];

    this.map.map(cell => {
      cell.resolvePopulationGrowth(progress);
      cell.resolveStandingArmy(progress);

      updatedMap.push(cell);
    });

    this.setMapState(updatedMap);
  }

  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }

    return GameState.instance;
  }
}
