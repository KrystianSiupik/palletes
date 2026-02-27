import { Pallet } from "./PalletAggregate";
export interface PalletRepository {
  upsert: () => Promise<Pallet>;
  delete: (id: string) => void;
  getAll: () => Promise<Pallet[]>;
  findById: () => Promise<Pallet>;
}
