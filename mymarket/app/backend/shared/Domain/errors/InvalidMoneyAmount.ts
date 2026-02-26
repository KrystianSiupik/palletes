import { DomainError } from "./DomainError";
export class InvalidMoneyAmount extends DomainError {
  constructor() {
    super("Invalid money amount");
  }
}
