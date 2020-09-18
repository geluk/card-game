type Handler<T> = (args: T) => void;

export default class Observable<T> {
  private handlers: Handler<T>[];

  public constructor() {
    this.handlers = [];
  }

  public observe(handler: Handler<T>) {
    this.handlers.push(handler);
  }

  public notify(message: T) {
    this.handlers.forEach((h) => {
      h(message);
    });
  }
}
