import { DomainError } from "./DomainError";

export class CustomPalletDimensionsError extends DomainError {
  constructor() {
    super("Custom pallets must define dimenions");
  }
}
