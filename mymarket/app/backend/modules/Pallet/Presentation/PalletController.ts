import { NextRequest, NextResponse } from "next/server";
import { Pallet } from "../Domain/PalletAggregate";
import { PalletMapper } from "../Infrastructure/PalletMapper";
import { PrismaPalletRepository } from "../Infrastructure/Prisma.PalletRepository";
import { Size } from "../Domain/SizeValueObject";
import type { PalletUpsertDto } from "../Infrastructure/PalletUpsertDto";

const repository = new PrismaPalletRepository();

export class PalletController {
  static async getAll() {
    const pallets = await repository.getAll();
    const response = pallets.map(PalletMapper.toResponse);
    return NextResponse.json(response);
  }

  static async getById(id: string) {
    const pallet = await repository.findById(id);

    if (!pallet) {
      return NextResponse.json(
        { error: "Pallet not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(PalletMapper.toResponse(pallet));
  }

  static async create(request: NextRequest) {
    const body: PalletUpsertDto = await request.json();

    const size = Size.fromMillimeters(body.length, body.width, body.height);
    const pallet = Pallet.create(
      body.name,
      size,
      body.type,
      body.certification,
    );

    await repository.upsert(pallet);

    return NextResponse.json(PalletMapper.toResponse(pallet), { status: 201 });
  }

  static async update(id: string, request: NextRequest) {
    const existing = await repository.findById(id);

    if (!existing) {
      return NextResponse.json(
        { error: "Pallet not found" },
        { status: 404 },
      );
    }

    const body: PalletUpsertDto = await request.json();

    const size = Size.fromMillimeters(body.length, body.width, body.height);
    const pallet = Pallet.rehydrate({
      id,
      name: body.name,
      size,
      type: body.type,
      certification: body.certification,
    });

    await repository.upsert(pallet);

    return NextResponse.json(PalletMapper.toResponse(pallet));
  }

  static async delete(id: string) {
    const existing = await repository.findById(id);

    if (!existing) {
      return NextResponse.json(
        { error: "Pallet not found" },
        { status: 404 },
      );
    }

    await repository.delete(id);

    return NextResponse.json({ deleted: true });
  }
}
