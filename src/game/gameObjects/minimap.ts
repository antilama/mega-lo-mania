import {Map} from '../models/map.interfaces';

export class Minimap {
  private static instance: Minimap;
  private growthRate = 0.1; // per second per pair of peeps
  private minimalGrowthRate = 0.05;
  private map: Map = [
    {modelPop: 2, pop: 2},
    {modelPop: 1, pop: 1},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
    {modelPop: 0, pop: 0},
  ];

  private constructor() {
    const GRID = document.createElement('div');
    GRID.id = 'minimap-grid';

    document.body.appendChild(GRID);

    this.map.forEach((cell, i) => {
      const CELL = document.createElement('div');
      CELL.className = 'minimap-cell';
      CELL.id = `minimap-${i}`;

      GRID.appendChild(CELL);
    });
  }

  public static getInstance(): Minimap {
    if (!Minimap.instance) {
      Minimap.instance = new Minimap();
    }

    return Minimap.instance;
  }

  setMapStatus(map: Map) {
    this.map = map;
  }

  updatePopulationModel(progress: number): Map {
    const updatedMap: Map = [];

    this.map.map(cell => {
      if (cell.pop >= 2 && cell.pop < 100) {
        const secondPercentage = progress / 1000;
        const pairsInPopulation = (cell.pop - (cell.pop % 2)) / 2;
        const growth = pairsInPopulation * this.growthRate * secondPercentage;

        cell.modelPop +=
          growth < this.minimalGrowthRate ? this.minimalGrowthRate : growth;

        cell.pop = cell.modelPop >= 100 ? 100 : Math.floor(cell.modelPop);
      }

      updatedMap.push(cell);
    });

    return updatedMap;
  }

  drawMinimap(): void {
    this.map.forEach((cell, i) => {
      const CELL = document.getElementById(`minimap-${i}`);
      if (CELL) {
        CELL.textContent = String(cell.pop);
      }
    });
  }
}
