import { CardId, Card } from './Card';

export default class CardBuilder {
  public static createCards(setCount: number): Card[] {
    const cards = this.range(setCount, 2).flatMap((s) => this.createFullSet(s));
    const shuffled = [];
    while (cards.length > 0) {
      const randomCard = Math.floor(Math.random() * cards.length);
      shuffled.push(cards.splice(randomCard, 1)[0]);
    }
    return shuffled;
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
      // Required to satisfy JSlint.
      // The Typescript compiler will actually prevent you
      // from calling this method with an invalid enum value,
      // so this can only result in a runtime error if you
      // ignore the TS compiler error.
      default: throw new Error('Unreachable');
    }
  }

  private static range(size: number, startAt: number) {
    return [...Array(size).keys()].map((i) => i + startAt);
  }
}
