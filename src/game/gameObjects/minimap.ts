import {Map} from '../models/map.type';

export class Minimap {
  private static instance: Minimap;
  private firstDraw = true;

  private constructor() {}

  public static getInstance(): Minimap {
    if (!Minimap.instance) {
      Minimap.instance = new Minimap();
    }

    return Minimap.instance;
  }

  drawMinimap(map: Map): void {
    if (this.firstDraw) {
      this.firstDraw = false;

      const GRID = document.createElement('div');
      GRID.id = 'minimap-grid';

      document.body.appendChild(GRID);

      map.forEach((cell, i) => {
        const CELL = document.createElement('div');
        CELL.className = 'minimap-cell';
        CELL.id = `minimap-${i}`;

        GRID.appendChild(CELL);
      });
    }

    map.forEach((cell, i) => {
      const CELL = document.getElementById(`minimap-${i}`);
      if (CELL) {
        CELL.textContent = `Army (${cell.army.red?.rock}, ${
          cell.army.blue?.rock
        }). Owned by ${
          cell.owner ? cell.owner : Math.floor(cell.towerBuildingProgress)
        }. Tower Pop ${cell.towerScreenPop}. State ${
          (<any>cell.state).constructor.name
        }`;
      }
    });
  }
}
