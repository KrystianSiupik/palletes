import { PalletController } from "../../modules/Pallet/Presentation/PalletController";

export const handler = () => {
  var palletes = PalletController.getAll();

  return palletes;
};
