import { Card } from '@/game/Card';
import CardSet from '@/game/CardSet';
import CardBuilder from './CardBuilder';
import NotifyType from './NotifyType';

const HAND_MAX = 6;

type NotifyHandler = (type: NotifyType, msg: string) => void;

export default class Game {
  stack: Card[];

  hand: Card[];

  discard: Card[];

  table: CardSet[];

  assemblyArea: CardSet;

  handlers: NotifyHandler[];

  constructor() {
    const cards = CardBuilder.createCards(5);

    this.hand = cards.splice(0, 6);
    this.stack = cards;
    this.discard = [];
    this.table = [];
    this.assemblyArea = new CardSet();
    this.handlers = [];
  }

  public moveToHand() {
    if (this.hand.length < HAND_MAX) {
      const removedCard = this.stack.shift();
      if (removedCard) {
        this.hand.push(removedCard);
      }
    } else {
      this.notify(NotifyType.Error, `You cannot have more than ${HAND_MAX} cards in your hand.`);
    }
  }

  public moveToDiscard(card: Card) {
    this.takeCard(card);
    this.discard.push(card);
  }

  public moveToAssemblyArea(card: Card) {
    if (this.assemblyArea.accepts(card)) {
      this.takeCard(card);
      this.assemblyArea.add(card);
    } else {
      this.hand.push(...this.assemblyArea.clear());
    }
    if (this.assemblyArea.isFullSet()) {
      this.table.push(this.assemblyArea);
      this.assemblyArea = new CardSet();
    }
  }

  public positionCardInHand(card: Card, recipient: Card | null) {
    this.takeCard(card);
    if (recipient === null) {
      this.hand.unshift(card);
    } else {
      const index = this.hand.indexOf(recipient);
      this.hand.splice(index + 1, 0, card);
    }
  }

  public findCard(uniqueId: string): Card {
    // eslint-disable-next-line
    for (const arr of [this.stack, this.hand, this.discard]) {
      const card = arr.find((c) => c.uniqueId === uniqueId);
      if (card) {
        return card;
      }
    }

    // Required to satisfy the compiler,
    // as the above loop is not guaranteed to return.
    throw new Error(`Unreachable (card with ID ${uniqueId} does not exist)`);
  }

  public subscribe(handler: NotifyHandler) {
    this.handlers.push(handler);
  }

  private takeCard(card: Card) {
    // eslint-disable-next-line
    for (const arr of [this.stack, this.hand, this.discard]) {
      const index = arr.indexOf(card);
      if (index >= 0) {
        arr.splice(index, 1);
      }
    }
  }

  private notify(type: NotifyType, msg: string) {
    this.handlers.forEach((h) => h(type, msg));
  }
}
