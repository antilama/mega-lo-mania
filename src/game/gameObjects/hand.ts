import {BehaviorSubject} from 'rxjs';

export class Hand {
  private static instance: Hand;
  private handCount$ = new BehaviorSubject(0);
  private handCount = 0;
  private counter: HTMLDivElement;

  private constructor() {
    this.counter = document.createElement('div');
    this.counter.id = 'hand-counter';

    document.getElementsByTagName('body')[0].appendChild(this.counter);
  }

  public static getInstance(): Hand {
    if (!Hand.instance) {
      Hand.instance = new Hand();
    }

    return Hand.instance;
  }

  getHandCount() {
    return this.handCount$.asObservable();
  }

  setCount(value: number) {
    this.handCount = value;
    this.handCount$.next(this.handCount);
  }

  drawCounter() {
    this.counter.textContent = String(this.handCount);
  }
}
