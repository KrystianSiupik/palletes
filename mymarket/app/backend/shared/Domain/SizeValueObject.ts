import { InvalidLength } from "./errors/InvalidLength";

export class Length {
  private constructor(private readonly millimeters: number) {
    if (!Number.isFinite(millimeters) || millimeters < 0) {
      throw new InvalidLength();
    }

    Object.freeze(this);
  }

  static fromMillimeters(mm: number): Length {
    return new Length(mm);
  }

  static fromCentimeters(cm: number): Length {
    return new Length(cm * 10);
  }

  static fromMeters(m: number): Length {
    return new Length(m * 1000);
  }

  static fromFeet(ft: number): Length {
    return new Length(ft * 304.8);
  }

  toMillimeters(): number {
    return this.millimeters;
  }

  toCentimeters(): number {
    return this.millimeters / 10;
  }

  toMeters(): number {
    return this.millimeters / 1000;
  }

  toFeet(): number {
    return this.millimeters / 304.8;
  }

  add(other: Length): Length {
    return new Length(this.millimeters + other.millimeters);
  }

  subtract(other: Length): Length {
    const result = this.millimeters - other.millimeters;
    if (result < 0) {
      throw new InvalidLength();
    }
    return new Length(result);
  }

  equals(other: Length): boolean {
    return this.millimeters === other.millimeters;
  }
}
