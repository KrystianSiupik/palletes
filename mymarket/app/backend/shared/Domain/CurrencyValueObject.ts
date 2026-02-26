type CurrencyCode = "PLN" | "EUR" | "USD";

export class Currency {
  private constructor(public readonly code: CurrencyCode) {}

  static is(code: CurrencyCode) {
    return new Currency(code);
  }
}
