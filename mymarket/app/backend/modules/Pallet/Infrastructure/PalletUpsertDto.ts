import { PalletCertification } from "../Domain/PalletCertification";
import { PalletType } from "../Domain/PalletType";

export interface PalletUpsertDto {
  name: string;
  type: PalletType;
  length: number;
  width: number;
  height: number;
  certification: PalletCertification[];
}
