import { L, t } from "../utilities/i18n";
import { Building } from "./BuildingDefinitions";
import { ITechTree, IUnlockableDefinition } from "./ITechDefinition";
import { Deposit } from "./ResourceDefinitions";
import {
   RomeHistoryDefinitions,
   RomeHistoryStageDefinitions,
   RomeHistoryUnlockDefinitions,
} from "./RomeHistoryDefinitions";
import { RomeProvinceDefinitions } from "./RomeProvinceDefinitions";
import { TechAgeDefinitions, TechDefinitions, TechUnlockDefinitions } from "./TechDefinitions";

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
      techTree: "Generic",
      unlockable: {},
   };
}

export class TechTreeDefinitions {
   Generic: ITechTree = {
      definitions: Object.freeze(new TechDefinitions()),
      prerequisites: TechUnlockDefinitions,
      ages: Object.freeze(new TechAgeDefinitions()),
   };
   Rome: ITechTree = {
      definitions: Object.freeze(new RomeHistoryDefinitions()),
      prerequisites: RomeHistoryUnlockDefinitions,
      ages: Object.freeze(new RomeHistoryStageDefinitions()),
   };
}

export const TechTree = Object.freeze(new TechTreeDefinitions());

export type City = keyof CityDefinitions;

interface ICityDefinition {
   deposits: Record<Deposit, number>;
   size: number;
   name: () => string;
   buildingTexture: Partial<Record<Building, string>>;
   techTree: keyof TechTreeDefinitions;
   unlockable: Record<string, IUnlockableDefinition>;
}
