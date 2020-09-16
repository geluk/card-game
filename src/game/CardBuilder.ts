import { CardId, Card } from './Card';

export default class CardBuilder {
  public static createCards(setCount: number): Card[] {
    return this.range(setCount, 2).flatMap(this.createFullSet);
  }

  public static createFullSet(setId: number): Card[] {
    const suits = [CardId.One, CardId.Two, CardId.Three, CardId.Four];
    return suits.map((s) => this.createCard(setId, s));
  }

  public static createCard(setId: number, cardId: CardId): Card {
    return new Card(setId, cardId, this.getUrl(setId, cardId));
  }

  private static getUrl(setId: number, cardId: CardId): string {
    return `/img/cards/${setId}${this.getSuit(cardId)}.svg`;
  }

  private static getSuit(cardId: CardId): string {
    switch (cardId) {
      case CardId.One: return 'C';
      case CardId.Two: return 'D';
      case CardId.Three: return 'H';
      case CardId.Four: return 'S';
      default: throw new Error('Unexpected CardId value');
    }
  }

  private static range(size: number, startAt: number) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }
}
