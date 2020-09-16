import { Card, CardId } from '@/game/Card';
import CardSet from '@/game/CardSet';
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
      CardBuilder.createCard('3', CardId.One),
      CardBuilder.createCard('3', CardId.Three),
      CardBuilder.createCard('3', CardId.Four),
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

  public static addToHand() {
    // TBD
  }
}
