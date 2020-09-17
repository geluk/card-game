import { Card } from '@/game/Card';
import CardSet from '@/game/CardSet';
import CardBuilder from './CardBuilder';

export default class Game {
  stack: Card[];

  hand: Card[];

  discard: Card[];

  table: CardSet[];

  assemblyArea: CardSet;

  constructor() {
    const cards = CardBuilder.createCards(4);

    this.stack = cards;
    this.hand = [];
    this.discard = [];
    this.table = [];
    this.assemblyArea = new CardSet();
  }

  public moveToHand() {
    const removedCard = this.stack.shift();
    if (removedCard) {
      this.hand.push(removedCard);
    }
  }

  public moveToDiscard(uniqueId: string) {
    const card = this.takeCard(uniqueId);
    this.discard.push(card);
  }

  public moveToAssemblyArea(uniqueId: string) {
    const card = this.findCard(uniqueId)!;
    if (this.assemblyArea.accepts(card)) {
      this.takeCard(card.uniqueId);
      this.assemblyArea.add(card);
    }
    if (this.assemblyArea.isFullSet()) {
      this.table.push(this.assemblyArea);
      this.assemblyArea = new CardSet();
    }
  }

  public positionCardInHand(cardId: string, recipient: Card | null) {
    const card = this.takeCard(cardId);
    if (recipient === null) {
      this.hand.unshift(card);
    } else {
      const index = this.hand.indexOf(recipient);
      this.hand.splice(index + 1, 0, card);
    }
  }

  private takeCard(uniqueId: string): Card {
    const removeIfExists = (arr: Card[], id: string): Card | null => {
      const idx = arr.findIndex((c) => c.uniqueId === id);
      if (idx >= 0) {
        return arr.splice(idx, 1)[0];
      }
      return null;
    };

    // eslint-disable-next-line
    for (const arr of [this.stack, this.hand, this.discard]) {
      const card = removeIfExists(arr, uniqueId);
      if (card) {
        return card;
      }
    }

    // Required to satisfy the compiler,
    // as the above loop is not guaranteed to return.
    throw new Error(`Unreachable (card with ID ${uniqueId} does not exist)`);
  }

  private findCard(uniqueId: string): Card | null {
    // eslint-disable-next-line
    for (const arr of [this.stack, this.hand, this.discard]) {
      const card = arr.find((c) => c.uniqueId === uniqueId);
      if (card) {
        return card;
      }
    }
    return null;
  }

  public static addToHand() {
    // TBD
  }
}
