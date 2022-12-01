import { Resource } from "../definitions/ResourceDefinitions";
import { GameState } from "./GameState";
import { Tick } from "./TickLogic";

export function getResourceAmount(res: Resource, gs: GameState): number {
   return (
      Tick.current.resourcesByBuilding[res]?.reduce(
         (prev, curr) => prev + (gs.tiles[curr].building?.resources[res] ?? 0),
         0
      ) ?? 0
   );
}

export function trySpendResource(res: Resource, amount: number, gs: GameState): boolean {
   if (getResourceAmount(res, gs) < amount) {
      return false;
   }
   for (const xy of Tick.current.resourcesByBuilding[res] ?? []) {
      const building = gs.tiles[xy]?.building;
      if (!building) {
         continue;
      }
      const amountInStorage = building.resources[res] ?? 0;
      if (amountInStorage >= amount) {
         building.resources[res]! -= amount;
         return true;
      }
      amount -= amountInStorage;
      building.resources[res] = 0;
      if (amount <= 0) {
         return true;
      }
   }
   console.error("trySpendResource: should not reach here!");
   return false;
}

export function getAmountInTransit(xy: string, res: Resource, gs: GameState) {
   return (
      gs.transportation[xy]?.reduce((prev, curr) => {
         return prev + (curr.resource === res ? curr.amount : 0);
      }, 0) ?? 0
   );
}
