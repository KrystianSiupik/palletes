import { NextRequest } from "next/server";
import { PalletController } from "@/app/backend/modules/Pallet/Presentation/PalletController";

export async function GET() {
  return PalletController.getAll();
}

export async function POST(request: NextRequest) {
  return PalletController.create(request);
}
