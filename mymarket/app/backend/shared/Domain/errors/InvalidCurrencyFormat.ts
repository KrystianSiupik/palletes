import { DomainError } from "./DomainError";
export class InvalidCurrencyFormat extends DomainError {
  constructor() {
    super("This currency format is invalid");
  }
}
