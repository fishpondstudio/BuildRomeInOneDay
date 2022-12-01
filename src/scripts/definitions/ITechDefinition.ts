import { GlobalMultipliers, IModifier, Multiplier } from "../logic/TickLogic";
import { Building } from "./BuildingDefinitions";
import { Deposit } from "./ResourceDefinitions";
import { PartialSet } from "./TypeDefinitions";

export interface ITechDefinition extends IUnlockable {
   column: number;
}

export interface IUnlockable {
   name: () => string;
   unlockBuilding?: Building[];
   revealDeposit?: Deposit[];
   buildingModifier?: Partial<Record<Building, IModifier>>;
   buildingMultiplier?: Partial<Record<Building, Multiplier>>;
   globalMultiplier?: Partial<Record<keyof GlobalMultipliers, number>>;
   additionalUpgrades?: Array<() => string>;
}

export interface ITechAge {
   from: number;
   to: number;
   name: () => string;
}

export interface IUnlockableConfig<T extends string> {
   definitions: Record<T, IUnlockable>;
   unlocked: PartialSet<T>;
}

export interface ITechConfig<T extends string> extends IUnlockableConfig<T> {
   definitions: Record<T, ITechDefinition>;
   unlockDefinitions: Record<T, Readonly<T[]>>;
}

export interface ITechConfigWithAge<T extends string, K extends string> extends ITechConfig<T> {
   ageDefinitions: Record<K, ITechAge>;
}
