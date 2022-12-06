import { GlobalMultipliers, IModifier, Multiplier } from "../logic/TickLogic";
import { Building } from "./BuildingDefinitions";
import { Deposit } from "./ResourceDefinitions";
import { PartialSet } from "./TypeDefinitions";

export interface IUnlockableDefinition {
   name: () => string;
   unlockBuilding?: Building[];
   revealDeposit?: Deposit[];
   buildingModifier?: Partial<Record<Building, IModifier>>;
   buildingMultiplier?: Partial<Record<Building, Multiplier>>;
   globalMultiplier?: Partial<Record<keyof GlobalMultipliers, number>>;
   additionalUpgrades?: Array<() => string>;
}

export interface ITechDefinition extends IUnlockableDefinition {
   column: number;
}

export interface ITechAgeDefinition {
   from: number;
   to: number;
   name: () => string;
}

export interface IUnlockableConfig<T extends string> {
   definitions: Record<T, IUnlockableDefinition>;
   unlocked: PartialSet<T>;
   verb: () => string;
}

export interface ITechTree {
   definitions: Record<string, ITechDefinition>;
   prerequisites: Record<string, Readonly<string[]>>;
   ages: Record<string, ITechAgeDefinition>;
}
