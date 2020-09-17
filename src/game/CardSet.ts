import { Card, CardId } from './Card';

export default class CardSet {
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
  }

  public isFullSet(): boolean {
    return this.cards.length === 4;
  }

  public get setId() {
    return this.cards[0].setId;
  }
}
