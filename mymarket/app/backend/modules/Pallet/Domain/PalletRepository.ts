import { Pallet } from "./PalletAggregate";

export interface PalletRepository {
  upsert: (pallet: Pallet) => Promise<void>;
  delete: (id: string) => Promise<void>;
  getAll: () => Promise<Pallet[]>;
  findById: (id: string) => Promise<Pallet | null>;
}
