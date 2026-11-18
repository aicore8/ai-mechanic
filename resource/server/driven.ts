import { vehicleNearPlayer } from "@aicore8/lib/server";

/** The vehicle the player drives behind a client's net id, or 0. */
export const driven = (source: number, netId: number) =>
  vehicleNearPlayer(source, netId, { driver: true });
