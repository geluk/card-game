import { Card, CardId } from './card';
import CardSet from './cardset';

export default class Game {
  stack: Card[];

  hand: Card[];

  discard: Card[];

  table: CardSet[];

  constructor() {
    this.stack = [
      new Card(1, CardId.One, '/img/cards/2C.svg'),
      new Card(0, CardId.Two, '/img/cards/2D.svg'),
      new Card(2, CardId.Two, '/img/cards/4S.svg'),
    ];
    this.hand = [
      new Card(0, CardId.Two, '/img/cards/2D.svg'),
      new Card(2, CardId.Two, '/img/cards/4S.svg'),
    ];
    this.discard = [];
    this.table = [];
  }
}
