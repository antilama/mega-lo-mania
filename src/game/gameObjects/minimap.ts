import {MapCell} from '../classes/map-cell';
import {MAP_EMPTY} from '../configuration/levels/empty';
import {Map} from '../models/map.type';
import {Player} from '../models/players.type';

export class Minimap {
  private static instance: Minimap;
  private prevMapFrame = MAP_EMPTY;
  private isFirstDraw = true;

  private constructor() {}

  public static getInstance(): Minimap {
    if (!Minimap.instance) {
      Minimap.instance = new Minimap();
    }

    return Minimap.instance;
  }

  drawMinimap(map: Map): void {
    if (this.isFirstDraw) {
      this.firstDraw(map);
    }

    map.forEach((cell, i) => {
      const CELL = document.getElementById(`minimap-${i}`);

      if (CELL) {
        this.drawOwner(map[i], this.prevMapFrame[i], CELL);

        // DEBUG
        // CELL.textContent = `Army (${cell.army.red}, ${
        //   cell.army.blue
        // }). Owned by ${
        //   cell.owner ? cell.owner : Math.floor(cell.towerBuildingProgress)
        // }. Tower Pop ${cell.towerScreenPop}. State ${
        //   (<any>cell.state).constructor.name
        // }`;
      }
    });

    // save previous frame after each iteration
    this.prevMapFrame = map;
  }

  private firstDraw(map: Map) {
    this.isFirstDraw = false;

    const GRID = document.createElement('div');
    GRID.id = 'minimap-grid';

    document.body.appendChild(GRID);

    map.forEach((cell, i) => {
      const TOWER = document.createElement('div');
      TOWER.className = 'tower';

      const CELL_BODY = document.createElement('div');
      CELL_BODY.className = 'minimap-cell';
      CELL_BODY.id = `minimap-${i}`;

      CELL_BODY.appendChild(TOWER);
      CELL_BODY.appendChild(document.createElement('p'));

      GRID.appendChild(CELL_BODY);
    });
  }

  private drawOwner(
    cellData: MapCell,
    prevData: MapCell,
    cell: HTMLElement
  ): void {
    if (prevData.owner === cellData.owner) {
      return;
    }

    // clear owner graphics
    if (cellData.owner === null) {
      Object.values(Player).map(player => {
        cell.classList.remove(`minimap-owner-${player}`);
      });
    }

    // add owner graphics
    if (cellData.owner !== null) {
      cell.classList.add(`minimap-owner-${cellData.owner}`);
    }
  }
}
