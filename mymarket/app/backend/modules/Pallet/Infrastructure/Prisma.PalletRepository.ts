import { Pallet } from "../Domain/PalletAggregate";
import { PalletRepository } from "../Domain/PalletRepository";
import { prisma } from "@/prisma/prisma";
export class PrismaPalletRepository implements PalletRepository {
  constructor() {}

  async delete(id: string) {
    const pallet = await prisma.pallet.findUnique({
      where: {
        id,
      },
    });

    if (pallet) prisma.pallet.delete({ where: { id } });
  }
}
