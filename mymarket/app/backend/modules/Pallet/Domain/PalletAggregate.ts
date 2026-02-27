import { Size } from "./SizeValueObject";
import { PalletCertification } from "./PalletCertification";
import { PalletType } from "./PalletType";
import { STANDARD_DIMENSIONS } from "./StandardDimensions";
import { v4 as uuidv4 } from "uuid";
import { CustomPalletDimensionsError } from "./errors/CustomPalletDimensionsError";
export class Pallet {
  private constructor(
    private readonly id: string,
    private name: string,
    private size: Size,
    private type: PalletType,

    private certification: PalletCertification[],
  ) {}

  static create(
    name: string,
    size: Size,
    type: PalletType,

    certifcation: PalletCertification[],
  ) {
    const id = uuidv4();
    const standard = STANDARD_DIMENSIONS[type];

    if (name.length === 0) throw new Error("Name must have name");

    if (standard !== null && !size.equals(standard)) {
      throw new Error("Dimensions do not match pallet type standard");
    }

    if (type === PalletType.CUSTOM && !size) {
      throw new CustomPalletDimensionsError();
    }

    return new Pallet(id, name, size, type, certifcation);
  }

  static rehydrate(snapshot: {
    id: string;
    name: string;
    size: Size;
    type: PalletType;
    certifcation: PalletCertification[];
  }): Pallet {
    return new Pallet(
      snapshot.id,
      snapshot.name,
      snapshot.size,
      snapshot.type,
      snapshot.certifcation,
    );
  }
}
