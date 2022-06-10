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
      this.initialDraw(map);
    }

    map.forEach((cell, i) => {
      const PREV_FRAME_CELL = this.prevMapFrame[i];

      const CELL = document.getElementById(`minimap-${i}`);
      const TOWER = document.querySelector(`#minimap-${i} .tower`);

      if (CELL) {
        this.drawOwner(cell, PREV_FRAME_CELL, CELL);

        this.drawArmy(cell.armiesPresent, PREV_FRAME_CELL.armiesPresent, CELL);
      }

      if (TOWER) {
        TOWER.textContent = `${cell.towerScreenPop}`;
      }
    });

    // save previous frame after each iteration
    this.prevMapFrame = map;
  }

  private initialDraw(map: Map) {
    this.isFirstDraw = false;

    const GRID = document.createElement('div');
    GRID.id = 'minimap-grid';

    document.body.appendChild(GRID);

    map.forEach((cell, i) => {
      const CELL_BODY = this.createCellBody(i);
      GRID.appendChild(CELL_BODY);
    });
  }

  private drawArmy(
    presentArmies: Player[],
    prevPresentArmies: Player[],
    cell: HTMLElement
  ) {
    if (presentArmies.toString() === prevPresentArmies.toString()) {
      return;
    }

    this.removeAllArmies(cell);

    presentArmies.forEach(army_color => {
      this.createArmy(cell, army_color);
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

    // add owner graphics
    if (cellData.owner !== null) {
      cell.classList.add(`minimap-owner-${cellData.owner}`);
      this.createTower(cell);
      return;
    }

    // clear owner graphics
    if (cellData.owner === null) {
      Object.values(Player).map(player => {
        cell.classList.remove(`minimap-owner-${player}`);
      });

      this.removeTower(cell);
    }
  }

  createCellBody(cellID: number): HTMLElement {
    const CELL_BODY = document.createElement('div');
    CELL_BODY.className = 'minimap-cell';
    CELL_BODY.id = `minimap-${cellID}`;

    return CELL_BODY;
  }

  createTower(cell: HTMLElement): void {
    const TOWER = document.createElement('div');
    TOWER.className = 'tower';

    cell.appendChild(TOWER);
  }

  removeTower(cell: HTMLElement): void {
    const TOWER = cell.querySelectorAll('.tower');
    TOWER.forEach(tower => {
      cell.removeChild(tower);
    });
  }

  createArmy(cell: HTMLElement, color: Player): void {
    const ARMY = document.createElement('div');
    ARMY.className = `${color} army`;

    cell.appendChild(ARMY);
  }

  removeAllArmies(cell: HTMLElement): void {
    const ARMY = cell.querySelectorAll('.army');
    ARMY.forEach(army => {
      cell.removeChild(army);
    });
  }
}
