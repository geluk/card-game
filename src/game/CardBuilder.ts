import { CardId, Card } from './Card';

export default class CardBuilder {
  public static createCard(setId: string, cardId: CardId) {
    const nSetId = Number.parseInt(setId, 10);
    return new Card(nSetId, cardId, this.getUrl(nSetId, cardId));
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
}
