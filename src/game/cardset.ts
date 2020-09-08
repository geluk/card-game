import { Card } from './card';

export default class CardSet {
  cards: Card[];

  constructor(cards: Card[]) {
    this.cards = cards;
  }
}
