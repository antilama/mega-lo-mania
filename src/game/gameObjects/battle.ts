export class BattleScreen {
  private static instance: BattleScreen;
  private parentElemId: string;
  private isFirstDraw = true;

  private constructor(parentId: string) {
    this.parentElemId = parentId;
  }

  public static getInstance(parentId = 'game-viewport'): BattleScreen {
    if (!BattleScreen.instance) {
      BattleScreen.instance = new BattleScreen(parentId);
    }

    return BattleScreen.instance;
  }

  drawBattleScreen(no: number): void {
    const NUM = document.querySelector(`#${this.parentElemId} p#number`);
    if (NUM) {
      NUM.textContent = `${no}`;
    }
  }
}
