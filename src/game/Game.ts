import { Card, CARDS_PER_SET } from './Card';
import CardSet from './CardSet';
import CardBuilder from './CardBuilder';
import NotifyType from './NotifyType';
import GameOutcome from './GameOutcome';
import Observable from './Observable';

const HAND_MAX = 7;
const SETS_PER_GAME = 5;

type NotifyHandler = (type: NotifyType, msg: string) => void;
type Ongoing = 'ongoing';

export default class Game {
  stack: Card[];

  hand: Card[];

  discard: Card[] = [];

  table: CardSet[] = [];

  assemblyArea: CardSet;

  score = 0;

  shufflesRemaining = 1;

  finished = false;

  onMessage: Observable<[NotifyType, string]>;

  onFinished: Observable<GameOutcome>;

  constructor() {
    const cards = CardBuilder.createCards(SETS_PER_GAME);

    this.hand = cards.splice(0, HAND_MAX);
    this.stack = cards;
    this.assemblyArea = new CardSet();
    this.onFinished = new Observable();
    this.onMessage = new Observable();
  }

  public moveToHand() {
    if (this.hand.length >= HAND_MAX) {
      this.onMessage.notify([NotifyType.Error, `You cannot have more than ${HAND_MAX} cards in your hand.`]);
      return;
    }
    const removedCard = this.stack.shift();
    if (removedCard) {
      this.hand.push(removedCard);
    }
    this.checkGameState();
  }

  public moveToDiscard(card: Card) {
    this.takeCard(card);
    this.discard.push(card);
    this.checkGameState();
  }

  public moveToAssemblyArea(card: Card) {
    if (!this.validateDraw(card)) return;
    if (this.assemblyArea.accepts(card)) {
      this.takeCard(card);
      this.assemblyArea.add(card);
    } else {
      this.hand.push(...this.assemblyArea.clear());
    }
    if (this.assemblyArea.isFullSet()) {
      this.table.push(this.assemblyArea);
      this.assemblyArea = new CardSet();
      this.score += 5;
    }
    this.checkGameState();
  }

  public positionCardInHand(card: Card, recipient: Card | null) {
    if (!this.validateDraw(card)) return;
    this.takeCard(card);
    if (recipient === null) {
      this.hand.unshift(card);
    } else {
      const index = this.hand.indexOf(recipient);
      this.hand.splice(index + 1, 0, card);
    }
    this.checkGameState();
  }

  public findCard(uniqueId: string): Card {
    // eslint-disable-next-line
    for (const arr of [this.stack, this.hand, this.assemblyArea.cards]) {
      const card = arr.find((c) => c.uniqueId === uniqueId);
      if (card) {
        return card;
      }
    }

    // Required to satisfy the compiler,
    // as the above loop is not guaranteed to return.
    throw new Error(`Unreachable (card with ID ${uniqueId} does not exist)`);
  }

  public shuffle() {
    if (this.shufflesRemaining < 1) {
      this.onMessage.notify([NotifyType.Error, 'You cannot shuffle again this game.']);
      return;
    }
    this.shufflesRemaining -= 1;
    console.log(this.stack[0].url);
    this.stack.push(this.stack.shift()!);
    console.log(this.stack[0].url);
  }

  private validateDraw(card: Card): boolean {
    const isDraw = this.stack.indexOf(card) > -1;
    if (this.hand.length >= HAND_MAX && isDraw) {
      this.onMessage.notify([NotifyType.Error, `You cannot draw if your hand contains ${HAND_MAX} or more cards.`]);
      return false;
    }
    return true;
  }

  private takeCard(card: Card) {
    // eslint-disable-next-line
    for (const arr of [this.stack, this.hand, this.assemblyArea.cards]) {
      const index = arr.indexOf(card);
      if (index >= 0) {
        arr.splice(index, 1);
      }
    }
  }

  private checkGameState() {
    const gameState = this.getGameState();
    if (gameState !== null) {
      if (!this.finished && gameState === GameOutcome.Win) {
        this.score += 20;
      }
      this.finished = true;
      this.onFinished.notify(gameState);
    }
  }

  // Using null here is pretty dubious,
  // but it's more ergonomic than anything else I could find.
  // Ideally this would be a discriminated union like so:
  // GameState =
  //  | Ongoing
  //  | Finished(Win | NoMoreMoves)
  private getGameState(): GameOutcome | null {
    if (this.stack.length > 0) {
      return null;
    }
    if (this.hand.length === 0 && this.assemblyArea.cards.length === 0) {
      if (this.discard.length === 0) {
        return GameOutcome.Win;
      }
      return GameOutcome.HandClear;
    }

    const availableCards = this.hand.concat(this.assemblyArea.cards);
    const cardCounts = availableCards.reduce((acc: Array<number>, curr: Card) => {
      const val = acc[curr.setId] ?? 0;
      acc[curr.setId] = val + 1;
      return acc;
    }, []);

    console.log(cardCounts);

    const canMakeSet = !cardCounts.every((n) => n < CARDS_PER_SET);
    return canMakeSet ? null : GameOutcome.NoMoreMoves;
  }
}
