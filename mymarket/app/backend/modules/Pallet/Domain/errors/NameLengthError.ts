import { DomainError } from "./DomainError";

export class NameLenghtError extends DomainError {
  constructor() {
    super("The name must have more than 0 letters");
  }
}
