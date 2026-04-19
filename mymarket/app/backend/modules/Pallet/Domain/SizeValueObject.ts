import { Length } from "@/app/backend/shared/Domain/SizeValueObject";

export class Size {
  private constructor(
    private readonly length: Length,
    private readonly width: Length,
    private readonly height: Length,
  ) {
    Object.freeze(this);
  }

  static of(length: Length, width: Length, height: Length) {
    return new Size(length, width, height);
  }

  static fromMillimeters(length: number, width: number, height: number) {
    return new Size(
      Length.fromMillimeters(length),
      Length.fromMillimeters(width),
      Length.fromMillimeters(height),
    );
  }

  getLength(): Length {
    return this.length;
  }

  getWidth(): Length {
    return this.width;
  }

  getHeight(): Length {
    return this.height;
  }

  equals(other: Size): boolean {
    return (
      this.length.equals(other.length) &&
      this.width.equals(other.width) &&
      this.height.equals(other.height)
    );
  }
}
