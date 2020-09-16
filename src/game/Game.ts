import { Card, CardId } from '@/game/Card';
import CardSet from '@/game/CardSet';
import CardBuilder from './CardBuilder';

export default class Game {
  stack: Card[];

  hand: Card[];

  discard: Card[];

  table: CardSet[];

  constructor() {
    this.stack = CardBuilder.createFullSet(2);
    this.hand = CardBuilder.createFullSet(3);
    this.discard = [];
    this.table = [];
  }

  public static addToHand() {
    // TBD
  }
}
