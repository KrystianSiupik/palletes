import { Money } from "./MoneyValueObject";
test("Add 1 + 2 PLN = 3", () => {
  const onePLN = Money.of(1, "PLN");
  const twoPLN = Money.of(2, "PLN");

  expect(onePLN.add(twoPLN)).toStrictEqual(Money.of(3, "PLN"));
});

test("Should throw when creating Money with Infinity", () => {
  expect(() => Money.of(Infinity, "PLN")).toThrow;
});

test("Should throw when currencies mismatch", () => {
  const moneyOne = Money.of(3, "PLN");
  const moneyTwo = Money.of(3, "ZL");
  expect(() => moneyOne.add(moneyTwo)).toThrow;
});

test("Should throw when currency is > 3 letters long", () => {
  expect(() => Money.of(3, "PLNA")).toThrow;
});
test("Should throw when currency is 0 letters long", () => {
  expect(() => Money.of(3, "")).toThrow;
});
