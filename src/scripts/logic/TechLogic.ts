import { ITechConfigWithAge, ITechDefinition } from "../definitions/ITechDefinition";
import { Deposit } from "../definitions/ResourceDefinitions";
import { RomeHistory, RomeHistoryStage, RomeHistoryUnlockDefinitions } from "../definitions/RomeHistoryDefinitions";
import { Tech, TechAge, TechUnlockDefinitions } from "../definitions/TechDefinitions";
import { Singleton } from "../Global";
import { forEach, isEmpty, keysOf, shuffle } from "../utilities/Helper";
import { Config } from "./Constants";
import { GameState } from "./GameState";
import { getDepositTileCount } from "./Tile";

export function getUnlockCost(def: ITechDefinition): number {
   return Math.pow(2, def.column) * 5000;
}

export function getScienceAmount(): number {
   return Singleton().buildings.Headquarter.building.resources.Science ?? 0;
}

export function getMostAdvancedTech<T extends string, K extends string>(config: ITechConfigWithAge<T, K>): T | null {
   let column = 0;
   let tech: T | null = null;
   forEach(config.definitions, (k) => {
      if (config.unlocked[k] && config.definitions[k].column >= column) {
         column = config.definitions[k].column;
         tech = k;
      }
   });
   return tech;
}

export function getCurrentTechAge<T extends string, K extends string>(config: ITechConfigWithAge<T, K>): K | null {
   const tech = getMostAdvancedTech(config);
   if (!tech) {
      return null;
   }
   return getAgeForTech(tech, config);
}

export function isAgeUnlocked<T extends string, K extends string>(age: K, config: ITechConfigWithAge<T, K>): boolean {
   const tech = getMostAdvancedTech(config);
   if (!tech) {
      return false;
   }
   return config.definitions[tech].column >= config.ageDefinitions[age].from;
}

export function getAgeForTech<T extends string, K extends string>(tech: T, config: ITechConfigWithAge<T, K>): K | null {
   const techColumn = config.definitions[tech].column;
   let age: K;
   for (age in config.ageDefinitions) {
      const ageDef = config.ageDefinitions[age];
      if (techColumn >= ageDef.from && techColumn <= ageDef.to) {
         return age;
      }
   }
   return null;
}

export function unlockTech<T extends string, K extends string>(
   tech: T,
   config: ITechConfigWithAge<T, K>,
   gs: GameState
): void {
   if (config.unlocked[tech]) {
      return;
   }
   config.unlocked[tech] = true;
   const td = config.definitions[tech];
   td.revealDeposit?.forEach((deposit) => {
      const tileCount = getDepositTileCount(deposit, gs);
      const tiles = shuffle(keysOf(gs.tiles)).slice(0, tileCount);
      const exploredEmptyTiles = Object.values(gs.tiles).filter((t) => t.explored && !t.building && isEmpty(t.deposit));
      if (tiles.every((xy) => !gs.tiles[xy].explored) && exploredEmptyTiles.length > 0) {
         tiles[0] = shuffle(exploredEmptyTiles)[0].xy;
      }
      tiles.forEach((xy) => (gs.tiles[xy].deposit[deposit] = true));
   });
}

export function getDepositUnlockTech<T extends string>(deposit: Deposit, definitions: Record<T, ITechDefinition>): T {
   let key: T;
   for (key in definitions) {
      if (definitions[key].revealDeposit?.includes(deposit)) {
         return key;
      }
   }
   throw new Error(`Deposit ${deposit} is not revealed by any technology, check TechDefinitions`);
}

export function getTechConfig(gs: GameState): ITechConfigWithAge<Tech, TechAge> {
   return {
      definitions: Config.Tech,
      ageDefinitions: Config.TechAge,
      unlockDefinitions: TechUnlockDefinitions,
      unlocked: gs.unlockedTech,
   };
}

export function getRomeHistoryConfig(gs: GameState): ITechConfigWithAge<RomeHistory, RomeHistoryStage> {
   return {
      definitions: Config.RomeHistory,
      ageDefinitions: Config.RomeHistoryStage,
      unlockDefinitions: RomeHistoryUnlockDefinitions,
      unlocked: gs.unlockedRomeHistory,
   };
}

export function unlockableTechs<T extends string, K extends string>(config: ITechConfigWithAge<T, K>): T[] {
   const result: T[] = [];
   forEach(config.definitions, (tech, def) => {
      if (config.unlocked[tech]) {
         return;
      }
      if (config.unlockDefinitions[tech].every((t) => config.unlocked[t])) {
         result.push(tech);
      }
   });
   return result;
}
