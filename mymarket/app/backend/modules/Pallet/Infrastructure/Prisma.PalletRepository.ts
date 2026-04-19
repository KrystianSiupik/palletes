import { Pallet } from "../Domain/PalletAggregate";
import { PalletRepository } from "../Domain/PalletRepository";
import { PalletMapper } from "./PalletMapper";
import { prisma } from "@/prisma/prisma";

export class PrismaPalletRepository implements PalletRepository {
  async upsert(pallet: Pallet): Promise<void> {
    const data = PalletMapper.toPersistence(pallet);

    await prisma.pallet.upsert({
      where: { id: data.id },
      create: {
        id: data.id,
        name: data.name,
        type: data.type,
        length: data.length,
        width: data.width,
        height: data.height,
        certificates: {
          createMany: {
            data: data.certification.map((cert) => ({ certificate: cert })),
          },
        },
      },
      update: {
        name: data.name,
        type: data.type,
        length: data.length,
        width: data.width,
        height: data.height,
        certificates: {
          deleteMany: {},
          createMany: {
            data: data.certification.map((cert) => ({ certificate: cert })),
          },
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.palletCertificateOnPallet.deleteMany({
      where: { palletId: id },
    });
    await prisma.pallet.delete({ where: { id } });
  }

  async getAll(): Promise<Pallet[]> {
    const pallets = await prisma.pallet.findMany({
      include: { certificates: true },
    });

    return pallets.map(PalletMapper.toDomain);
  }

  async findById(id: string): Promise<Pallet | null> {
    const pallet = await prisma.pallet.findUnique({
      where: { id },
      include: { certificates: true },
    });

    if (!pallet) return null;

    return PalletMapper.toDomain(pallet);
  }
}
