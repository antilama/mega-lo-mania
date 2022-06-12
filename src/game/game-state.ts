import {Map} from './models/map.type';

export class GameState {
  private static instance: GameState;
  private map: Map = [];

  private activeCID = 0;
  private previouslyActiveCID = 0;
  private switchViewport = false; // is it needed to switch screen to new cell

  private constructor() {}

  setMapState(updatedMap: Map): void {
    this.map = updatedMap;
  }

  setActiveCell(cellId: number): void {
    if (this.activeCID !== cellId) {
      this.previouslyActiveCID = this.activeCID; // save previous selection
      this.activeCID = cellId; // set new id

      this.switchViewport = true;
    }
  }

  activeCell(): number {
    return this.activeCID;
  }

  previouslyActiveCell(): number {
    return this.previouslyActiveCID;
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

    if (this.switchViewport) {
      this.switchViewport = false;

      updatedMap[this.previouslyActiveCID].deselect();
      updatedMap[this.activeCID].select();

      console.log('Switching view', updatedMap);
    }

    this.setMapState(updatedMap);
  }

  public static getInstance(): GameState {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }

    return GameState.instance;
  }
}
