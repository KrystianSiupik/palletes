import { DomainError } from "./DomainError";

export class InvalidLength extends DomainError {
  constructor() {
    super("Passed lenght is invalid");
  }
}
