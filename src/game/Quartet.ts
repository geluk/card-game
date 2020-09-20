import { Card, CARDS_PER_SET } from './Card';

export default class Quartet {
  cards: Card[];

  public constructor() {
    this.cards = [];
  }

  public accepts(card: Card) {
    return this.cards.length === 0
     || this.cards[0].setId === card.setId;
  }

  public add(card: Card) {
    this.cards.push(card);
    this.cards.sort((a, b) => a.cardId - b.cardId);
  }

  public clear(): Card[] {
    return this.cards.splice(0, this.cards.length);
  }

  public isFullSet(): boolean {
    return this.cards.length === CARDS_PER_SET;
  }

  public get setId() {
    return this.cards[0].setId;
  }
}
