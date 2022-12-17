import { GlobalMultipliers, IModifier, Multiplier } from "../logic/TickLogic";
import { Building } from "./BuildingDefinitions";
import { Deposit } from "./ResourceDefinitions";

export interface IUnlockableDefinition {
   name: () => string;
   require: string[];
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

export interface IUnlockableGroup {
   definitions: Record<string, IUnlockableDefinition>;
   verb: () => string;
}

export interface ITechTree extends IUnlockableGroup {
   definitions: Record<string, ITechDefinition>;
   ages: Record<string, ITechAgeDefinition>;
}
