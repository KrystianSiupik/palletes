import { Money } from "./MoneyValueObject";
import { Currency } from "./CurrencyValueObject";
test("Add 1 + 2 PLN = 3", () => {
  const PLN = Currency.is("PLN");
  const onePLN = Money.of(1, PLN);
  const twoPLN = Money.of(2, PLN);

  expect(onePLN.add(twoPLN)).toStrictEqual(Money.of(3, PLN));
});

test("Should throw when creating Money with Infinity", () => {
  const PLN = Currency.is("PLN");
  expect(() => Money.of(Infinity, PLN)).toThrow;
  expect(() => Money.of(-Infinity, PLN)).toThrow;
  expect(() => Money.of(1 / 0, PLN)).toThrow;
});

test("Should throw when currencies mismatch", () => {
  const PLN = Currency.is("PLN");
  const EUR = Currency.is("EUR");
  const moneyOne = Money.of(3, PLN);
  const moneyTwo = Money.of(3, EUR);
  expect(() => moneyOne.add(moneyTwo)).toThrow;
});
