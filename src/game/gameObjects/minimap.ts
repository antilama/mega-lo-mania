import {MapCell} from '../classes/map-cell';
import {MAP_EMPTY} from '../configuration/levels/empty';
import {GameState} from '../game-state';
import {Map} from '../models/map.type';
import {Player} from '../models/players.type';

export class Minimap {
  private static instance: Minimap;
  private prevMapFrame = MAP_EMPTY;
  private isFirstDraw = true;
  private GAME_STATE: GameState;

  private constructor() {
    this.GAME_STATE = GameState.getInstance();
  }

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
      const CELL_BODY = this.createCellBody(cell, i);
      GRID.appendChild(CELL_BODY);
    });
  }

  private drawSelection(selectedCID: number, prevSelectedCID: number) {
    document
      .getElementById(`minimap-${prevSelectedCID}`)
      ?.classList.remove('selected');

    document
      .getElementById(`minimap-${selectedCID}`)
      ?.classList.add('selected');
  }

  private drawArmy(
    presentArmies: Player[],
    prevPresentArmies: Player[],
    cell: HTMLElement
  ) {
    if (presentArmies.toString() === prevPresentArmies.toString()) {
      return;
    }

    console.log('Draw armies', presentArmies);
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

    console.log('Draw owner', cellData.owner);

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

  private createCellBody(cell: MapCell, cellID: number): HTMLElement {
    const CELL_BODY = document.createElement('div');
    CELL_BODY.className = 'minimap-cell';
    CELL_BODY.id = `minimap-${cellID}`;

    CELL_BODY.onclick = () => {
      this.selectCell(cellID);
    };

    if (cellID === this.GAME_STATE.activeCell()) {
      CELL_BODY.classList.add('selected');
    }

    return CELL_BODY;
  }

  private selectCell(cellID: number): void {
    this.GAME_STATE.setActiveCell(cellID);
    this.drawSelection(
      this.GAME_STATE.activeCell(),
      this.GAME_STATE.previouslyActiveCell()
    );
  }

  private createTower(cell: HTMLElement): void {
    const TOWER = document.createElement('div');
    TOWER.className = 'tower';

    cell.appendChild(TOWER);
  }

  private removeTower(cell: HTMLElement): void {
    const TOWER = cell.querySelectorAll('.tower');
    TOWER.forEach(tower => {
      cell.removeChild(tower);
    });
  }

  private createArmy(cell: HTMLElement, color: Player): void {
    const ARMY = document.createElement('div');
    ARMY.className = `${color} army`;

    cell.appendChild(ARMY);
  }

  private removeAllArmies(cell: HTMLElement): void {
    const ARMY = cell.querySelectorAll('.army');
    ARMY.forEach(army => {
      cell.removeChild(army);
    });
  }
}
