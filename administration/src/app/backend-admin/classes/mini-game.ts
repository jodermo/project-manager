export const MiniGameTypes = ['demo-game'];
export type MiniGameType = typeof MiniGameTypes[number];

export class MiniGame {
  points = 0;
  started = false;

  constructor(public type: MiniGameType, private onUpdate?: (miniGame: MiniGame) => void, private onWin?: (miniGame: MiniGame) => void, private onLoose?: (miniGame: MiniGame) => void) {

  }

  init() {
    this.initGame();
  }

  initGame(points = this.points) {
    this.updatePoints(points);
  }

  startGame(points = this.points) {
    this.updatePoints(points);
    this.started = true;
  }

  private updatePoints(points = this.points) {
    this.points = points;
    this.update();
  }

  private update() {
    if (this.onUpdate) {
      this.onUpdate(this);
    }
  }

  private win() {
    if (this.onWin) {
      this.onWin(this);
    }
  }

  private loose() {
    if (this.onLoose) {
      this.onLoose(this);
    }
  }

}
