export class Card {
  setId: number;

  cardId: CardId;

  uniqueId: string;

  url: string;

  constructor(setId: number, cardId: CardId, url: string) {
    this.setId = setId;
    this.cardId = cardId;
    this.url = url;
    this.uniqueId = `${setId}-${cardId}`;
  }
}

// Each set may only contain four unique cards,
// so we define an enum to enforce this.
export enum CardId {
  One,
  Two,
  Three,
  Four,
}
export const CARDS_PER_SET = 4;
