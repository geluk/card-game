import { Card, CardId } from './card';
import CardSet from './cardset';
import CardBuilder from './CardBuilder';

export default class Game {
  stack: Card[];

  hand: Card[];

  discard: Card[];

  table: CardSet[];

  constructor() {
    this.stack = [
      CardBuilder.createCard('2', CardId.Four),
      CardBuilder.createCard('3', CardId.Two),
    ];
    this.hand = [
      CardBuilder.createCard('2', CardId.One),
      CardBuilder.createCard('2', CardId.Two),
      CardBuilder.createCard('4', CardId.Four),
      CardBuilder.createCard('2', CardId.Three),
    ];
    this.discard = [];
    this.table = [];
  }
}
