import { L, t } from "../utilities/i18n";
import { Building } from "./BuildingDefinitions";
import { ITechTree, IUnlockableDefinition, IUnlockableGroup } from "./ITechDefinition";
import { Deposit } from "./ResourceDefinitions";
import { RomeHistoryDefinitions, RomeHistoryStageDefinitions } from "./RomeHistoryDefinitions";
import { RomeProvinceDefinitions } from "./RomeProvinceDefinitions";
// import { TechAgeDefinitions, TechDefinitions } from "./TechDefinitions";

export class CityDefinitions {
   Rome: ICityDefinition = {
      name: () => t(L.Rome),
      deposits: {
         Water: 0.02,
         Copper: 0.02,
         Iron: 0.02,
         Wood: 0.02,
         Stone: 0.02,
      },
      size: 40,
      buildingTexture: {
         Headquarter: "BuildingHeadquarterRome",
      },
      techTree: "Rome",
      unlockable: { ...Object.freeze(new RomeProvinceDefinitions()) },
   };
   Athens: ICityDefinition = {
      name: () => t(L.Rome),
      deposits: {
         Water: 0.02,
         Copper: 0.02,
         Iron: 0.02,
         Wood: 0.02,
         Stone: 0.02,
      },
      size: 40,
      buildingTexture: {
         Headquarter: "BuildingHeadquarterRome",
      },
      techTree: "Rome",
      unlockable: {},
   };
}

export const TechTree = {
   Rome: {
      definitions: Object.freeze(new RomeHistoryDefinitions()),
      ages: Object.freeze(new RomeHistoryStageDefinitions()),
      verb: () => t(L.Research),
   } as ITechTree,
} as const satisfies Record<string, ITechTree>;

export const Unlockable = {
   RomeProvince: {
      definitions: Object.freeze(new RomeProvinceDefinitions()),
      verb: () => t(L.Annex),
   } as IUnlockableGroup,
} as const satisfies Record<string, IUnlockableGroup>;

export type City = keyof CityDefinitions;

interface ICityDefinition {
   deposits: Record<Deposit, number>;
   size: number;
   name: () => string;
   buildingTexture: Partial<Record<Building, string>>;
   techTree: keyof typeof TechTree;
   unlockable: Record<string, IUnlockableDefinition>;
}
