import { enhanced } from "@aicore8/lib/server";
import { EVENTS } from "common/mechanic";

/**
 * Sends a fix to the vehicle: `engine` null = full repair, a value = the repair kit's engine health, -1 = only the
 * dirt (car wash). On Enhanced the server writes a repair itself (also while no client owns the vehicle); the owner
 * client still gets `fix` for what only it can change (dirt, the undriveable flag), on Legacy for everything.
 */
export function fixOn(vehicle: number, engine: number | null): void {
  if (engine === null) enhanced.repairVehicle(vehicle);
  else if (engine >= 0) enhanced.setVehicleEngineHealth(vehicle, engine);
  const owner = NetworkGetEntityOwner(vehicle);
  if (owner > 0)
    emitNet(EVENTS.fix, owner, NetworkGetNetworkIdFromEntity(vehicle), engine);
}
