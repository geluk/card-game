import { Card } from './Card';

export default class CardSet {
  cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards;
  }
}
