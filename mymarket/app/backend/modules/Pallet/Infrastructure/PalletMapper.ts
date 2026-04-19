import { Pallet } from "../Domain/PalletAggregate";
import { PalletCertification } from "../Domain/PalletCertification";
import { PalletType } from "../Domain/PalletType";
import { Size } from "../Domain/SizeValueObject";
import type {
  Pallet as PrismaPallet,
  PalletCertificateOnPallet,
} from "@prisma/client";

type PrismaPalletWithCerts = PrismaPallet & {
  certificates: PalletCertificateOnPallet[];
};

export class PalletMapper {
  static toDomain(raw: PrismaPalletWithCerts): Pallet {
    return Pallet.rehydrate({
      id: raw.id,
      name: raw.name,
      size: Size.fromMillimeters(raw.length, raw.width, raw.height),
      type: raw.type as PalletType,
      certification: raw.certificates.map(
        (c) => c.certificate as PalletCertification,
      ),
    });
  }

  static toPersistence(pallet: Pallet) {
    const s = pallet.snapshot();
    return {
      id: s.id,
      name: s.name,
      type: s.type,
      length: s.size.getLength().toMillimeters(),
      width: s.size.getWidth().toMillimeters(),
      height: s.size.getHeight().toMillimeters(),
      certification: s.certification,
    };
  }

  static toResponse(pallet: Pallet) {
    const s = pallet.snapshot();
    return {
      id: s.id,
      name: s.name,
      type: s.type,
      length: s.size.getLength().toMillimeters(),
      width: s.size.getWidth().toMillimeters(),
      height: s.size.getHeight().toMillimeters(),
      certification: s.certification,
    };
  }
}
