import { DomainError } from "./DomainError";

export class CurrencyMismatch extends DomainError {
  constructor() {
    super("Both currencies must be the same");
  }
}
