import { Size } from "./SizeValueObject";
import { PalletType } from "./PalletType";

export const STANDARD_DIMENSIONS: Record<PalletType, Size | null> = {
  [PalletType.EPAL_1]: Size.fromMillimeters(1200, 800, 144),
  [PalletType.EPAL_2]: Size.fromMillimeters(1200, 1000, 144),
  [PalletType.EPAL_3]: Size.fromMillimeters(1000, 1200, 144),
  [PalletType.EPAL_6]: Size.fromMillimeters(800, 600, 144),

  [PalletType.GMA]: Size.fromMillimeters(1219, 1016, 144),

  [PalletType.CUSTOM]: null,
};
