import { DomainError } from "./DomainError";

export class InvalidStandardDimensionsError extends DomainError {
  constructor() {
    super("Dimensions do not match pallet type standard");
  }
}
