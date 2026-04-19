import { NextRequest } from "next/server";
import { PalletController } from "@/app/backend/modules/Pallet/Presentation/PalletController";

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return PalletController.getById(id);
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = await params;
  return PalletController.update(id, request);
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const { id } = await params;
  return PalletController.delete(id);
}
