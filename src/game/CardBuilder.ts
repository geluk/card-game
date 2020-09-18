import { CardId, Card } from './Card';

export default class CardBuilder {
  public static createCards(setCount: number): Card[] {
    const cards = this.range(setCount, 1).flatMap((s) => this.createFullSet(s));
    const shuffled = [];
    while (cards.length > 0) {
      const randomCard = Math.floor(Math.random() * cards.length);
      shuffled.push(cards.splice(randomCard, 1)[0]);
    }
    return shuffled;
  }

  public static createFullSet(setId: number): Card[] {
    const suits = [CardId.Diamonds, CardId.Clubs, CardId.Hearts, CardId.Spades];
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
      case CardId.Diamonds: return 'D';
      case CardId.Clubs: return 'C';
      case CardId.Hearts: return 'H';
      case CardId.Spades: return 'S';
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
