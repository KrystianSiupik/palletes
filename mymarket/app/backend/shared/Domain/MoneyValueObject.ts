import { InvalidMoneyAmount } from "./errors/InvalidMoneyAmount";
import { InvalidCurrencyFormat } from "./errors/InvalidCurrencyFormat";
import { CurrencyMismatch } from "./errors/CurrencyMismatch";

export class Money {
  private constructor(
    public readonly amount: number,
    public readonly currency: string,
  ) {
    if (!Number.isFinite(amount) || amount < 0) throw new InvalidMoneyAmount();
    if (!currency || currency.length > 3) throw new InvalidCurrencyFormat();
  }

  static of(amount: number, currency: string) {
    return new Money(amount, currency);
  }

  add(other: Money) {
    if (this.currency != other.currency) throw new CurrencyMismatch();

    const amount = this.amount + other.amount;
    if (!Number.isFinite(amount)) throw new InvalidMoneyAmount();

    return Money.of(this.amount + other.amount, this.currency);
  }

  sub(other: Money) {
    if (this.currency != other.currency) throw new CurrencyMismatch();
    return Money.of(this.amount - other.amount, this.currency);
  }
}
