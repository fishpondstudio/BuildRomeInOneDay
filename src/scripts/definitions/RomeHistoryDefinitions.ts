import { L, t } from "../utilities/i18n";
import { ITechAgeDefinition, ITechDefinition } from "./ITechDefinition";
import { RomeProvince } from "./RomeProvinceDefinitions";

export class RomeHistoryStageDefinitions {
   AgeOfSevenKings: ITechAgeDefinition = {
      from: 0,
      to: 1,
      name: () => t(L.AgeOfSevenKings),
   };
   AgeOfRepublic: ITechAgeDefinition = { from: 2, to: 3, name: () => t(L.AgeOfRepublic) };
   MediterraneanSuperPower: ITechAgeDefinition = {
      from: 4,
      to: 7,
      name: () => t(L.MediterraneanSuperPower),
   };
   AgeOfDictators: ITechAgeDefinition = {
      from: 8,
      to: 9,
      name: () => t(L.AgeOfDictators),
   };
   AgeOfTriumvirate: ITechAgeDefinition = {
      from: 10,
      to: 12,
      name: () => t(L.AgeOfTriumvirate),
   };
}

export type RomeHistoryStage = keyof RomeHistoryStageDefinitions;

export interface IRomeHistoryDefinitions extends ITechDefinition {
   requireProvince?: RomeProvince[];
}

export class RomeHistoryDefinitions {
   PalatineHill: IRomeHistoryDefinitions = {
      name: () => t(L.PalatineHill),
      column: 0,
      revealDeposit: ["Stone"],
      unlockBuilding: ["StoneQuarry"],
   };
   TiberRiver: IRomeHistoryDefinitions = {
      name: () => t(L.TiberRiver),
      column: 0,
      revealDeposit: ["Water"],
      unlockBuilding: ["Aqueduct"],
   };
   CuriateAssembly: IRomeHistoryDefinitions = {
      name: () => t(L.CuriateAssembly),
      column: 0,
      revealDeposit: ["Wood"],
      unlockBuilding: ["LoggingCamp"],
   };
   Senate: IRomeHistoryDefinitions = {
      name: () => t(L.Senate),
      column: 0,
      unlockBuilding: ["Hut", "Farmland"],
   };
   Metallurgy: IRomeHistoryDefinitions = {
      name: () => t(L.Metallurgy),
      column: 1,
      revealDeposit: ["Copper"],
      unlockBuilding: ["CopperMiningCamp"],
   };
   Election: IRomeHistoryDefinitions = {
      name: () => t(L.Election),
      column: 1,
      unlockBuilding: ["Blacksmith"],
      globalMultiplier: { sciencePerBusyWorker: 1 },
      buildingMultiplier: { Hut: { output: 1 } },
   };
   Legion: IRomeHistoryDefinitions = {
      name: () => t(L.Legion),
      column: 2,
      unlockBuilding: ["Armory", "Barrack"],
   };
   TribalAssembly: IRomeHistoryDefinitions = {
      name: () => t(L.TribalAssembly),
      column: 2,
      unlockBuilding: ["StonemasonsWorkshop"],
   };
   Republic: IRomeHistoryDefinitions = {
      name: () => t(L.Republic),
      column: 2,
      globalMultiplier: { sciencePerIdleWorker: 1 },
      buildingMultiplier: { Farmland: { storage: 1, output: 1 } },
   };
   CenturiateAssembly: IRomeHistoryDefinitions = {
      name: () => t(L.CenturiateAssembly),
      column: 2,
      unlockBuilding: ["IronMiningCamp"],
      revealDeposit: ["Iron"],
   };
   PyrrhicWar: IRomeHistoryDefinitions = {
      name: () => t(L.PyrrhicWar),
      column: 3,
      requireProvince: ["Italia"],
      unlockBuilding: ["LivestockFarm"],
   };
   Dictator: IRomeHistoryDefinitions = {
      name: () => t(L.Dictator),
      column: 3,
      additionalUpgrades: [() => t(L.TechProductionPriority)],
      buildingMultiplier: {
         Armory: { worker: 1 },
         Barrack: { worker: 1 },
      },
   };
   Consul: IRomeHistoryDefinitions = {
      name: () => t(L.Consul),
      column: 3,
      additionalUpgrades: [() => t(L.TechStockpileMode)],
      buildingMultiplier: {
         Blacksmith: { worker: 1 },
         StonemasonsWorkshop: { worker: 1 },
      },
   };
   PontifexMaximus: IRomeHistoryDefinitions = {
      name: () => t(L.PontifexMaximus),
      column: 3,
      unlockBuilding: ["Villa"],
   };
   FirstPunicWar: IRomeHistoryDefinitions = {
      name: () => t(L.FirstPunicWar),
      requireProvince: ["Sicillia", "SardiniaAndCorsica"],
      buildingModifier: { Armory: { input: { Iron: 1 }, output: { Weapon: 1 } } },
      buildingMultiplier: { Barrack: { storage: 1 } },
      column: 4,
   };
   IllyrianWar: IRomeHistoryDefinitions = {
      name: () => t(L.IllyrianWar),
      column: 4,
      requireProvince: ["Illyricum"],
      buildingMultiplier: { Armory: { worker: 1 }, Barrack: { worker: 1 }, Aqueduct: { output: 1, storage: 1 } },
   };
   TribuneOfThePlebs: IRomeHistoryDefinitions = {
      name: () => t(L.TribuneOfThePlebs),
      column: 4,
      unlockBuilding: ["Insula"],
      buildingMultiplier: { Villa: { worker: 1 } },
   };
   FabianStrategy: IRomeHistoryDefinitions = {
      name: () => t(L.FabianStrategy),
      column: 5,
      buildingMultiplier: {
         Blacksmith: { input: 1, output: 1 },
         Armory: { input: 1, output: 1 },
         Barrack: { storage: 1 },
      },
   };
   Nobilis: IRomeHistoryDefinitions = {
      name: () => t(L.Nobilis),
      column: 5,
      buildingModifier: { Farmland: { input: { Water: 1 }, output: { Crop: 2 } } },
      unlockBuilding: ["Brewery"],
   };
   SecondPunicWar: IRomeHistoryDefinitions = {
      name: () => t(L.SecondPunicWar),
      column: 6,
      requireProvince: ["Hispania"],
      buildingMultiplier: { Armory: { input: 1, output: 1 }, Barrack: { input: 1, output: 1 } },
   };
   MacedonianWar: IRomeHistoryDefinitions = {
      name: () => t(L.MacedonianWar),
      requireProvince: ["Macedonia"],
      column: 6,
      unlockBuilding: ["Colosseum"],
   };
   CursusHonorum: IRomeHistoryDefinitions = {
      name: () => t(L.CursusHonorum),
      column: 6,
      unlockBuilding: ["Domus"],
      buildingMultiplier: { Villa: { storage: 1 }, Insula: { storage: 1 } },
   };
   ThirdPunicWar: IRomeHistoryDefinitions = {
      name: () => t(L.ThirdPunicWar),
      requireProvince: ["Africa", "GalliaCisalpina"],
      column: 7,
      buildingMultiplier: { Villa: { input: 1, output: 1 }, Insula: { input: 1, output: 1 } },
   };
   Populares: IRomeHistoryDefinitions = {
      name: () => t(L.Populares),
      column: 7,
      unlockBuilding: ["CircusMaximus"],
      buildingMultiplier: { Farmland: { worker: 1, storage: 1, output: 1 } },
   };
   Optimates: IRomeHistoryDefinitions = {
      name: () => t(L.Optimates),
      column: 7,
      unlockBuilding: ["IronForge"],
      buildingMultiplier: {
         StoneQuarry: { input: 1, output: 1 },
         StonemasonsWorkshop: { worker: 1, storage: 1 },
      },
   };
   MarianReform: IRomeHistoryDefinitions = {
      name: () => t(L.MarianReform),
      column: 8,
      buildingMultiplier: {
         Armory: { output: 1, storage: 1, worker: 1 },
         Barrack: { output: 1, storage: 1, worker: 1 },
      },
   };
   Imperator: IRomeHistoryDefinitions = {
      name: () => t(L.Imperator),
      column: 8,
      unlockBuilding: ["Library"],
   };
   Proscription: IRomeHistoryDefinitions = {
      name: () => t(L.Proscription),
      column: 8,
      buildingMultiplier: {
         Aqueduct: { output: 1, storage: 1 },
         LivestockFarm: { output: 1, storage: 1 },
      },
      globalMultiplier: { sciencePerBusyWorker: 1 },
   };
   GallicWars: IRomeHistoryDefinitions = {
      name: () => t(L.GallicWar),
      column: 9,
      requireProvince: ["GalliaTransalpina", "Gallia"],
      buildingMultiplier: {
         CopperMiningCamp: { output: 1, worker: 1 },
         Blacksmith: { output: 1, storage: 1 },
      },
   };
   MithridaticWar: IRomeHistoryDefinitions = {
      name: () => t(L.MithridaticWar),
      column: 9,
      requireProvince: ["Bithynia", "Pontus", "Cilicia", "Syria", "Creta"],
      buildingMultiplier: {
         Brewery: { output: 1, storage: 1 },
         Domus: { output: 1, storage: 1 },
      },
   };
   CaesarsCivilWar: IRomeHistoryDefinitions = {
      name: () => t(L.CaesarsCivilWar),
      column: 9,
      requireProvince: ["Numidia"],
      buildingMultiplier: {
         IronForge: { input: 1, output: 1 },
         Armory: { input: 1, output: 1 },
      },
   };
   CaesarsAssassination: IRomeHistoryDefinitions = {
      name: () => t(L.CaesarsAssassination),
      column: 10,
      globalMultiplier: { sciencePerIdleWorker: 1 },
      unlockBuilding: ["Pantheon"],
      buildingMultiplier: { Library: { storage: 1, worker: 1 } },
   };
   LiberatorsCivilWar: IRomeHistoryDefinitions = {
      name: () => t(L.LiberatorsCivilWar),
      column: 11,
      requireProvince: ["Cyprus"],
      buildingMultiplier: { Blacksmith: { input: 1, output: 1 } },
   };
   WarOfActium: IRomeHistoryDefinitions = {
      name: () => t(L.WarOfActium),
      column: 11,
      requireProvince: ["Aegyptus"],
      buildingMultiplier: { Library: { input: 1, output: 1 }, Domus: { storage: 1, worker: 1 } },
   };
   FirstCitizen: IRomeHistoryDefinitions = {
      name: () => t(L.FirstCitizen),
      column: 11,
      buildingMultiplier: { Library: { worker: 1, storage: 1 }, Domus: { input: 1, output: 1 } },
   };
   PaxRomana: IRomeHistoryDefinitions = {
      name: () => t(L.PaxRomana),
      column: 12,
   };
}

export type RomeHistory = keyof RomeHistoryDefinitions;

export const RomeHistoryUnlockDefinitions: Record<RomeHistory, Readonly<RomeHistory[]>> = Object.freeze({
   PalatineHill: [],
   TiberRiver: [],
   CuriateAssembly: [],
   Senate: [],
   Metallurgy: ["PalatineHill", "TiberRiver"],
   Election: ["CuriateAssembly", "Senate"],
   Legion: ["Metallurgy"],
   TribalAssembly: ["Election"],
   CenturiateAssembly: ["Election"],
   Republic: ["Election"],
   PyrrhicWar: ["Legion", "TribalAssembly"],
   PontifexMaximus: ["Republic", "CenturiateAssembly"],
   Consul: ["Republic"],
   TribuneOfThePlebs: ["Consul", "PontifexMaximus"],
   Dictator: ["Republic", "TribalAssembly"],
   FirstPunicWar: ["Dictator", "PyrrhicWar"],
   IllyrianWar: ["Dictator"],
   FabianStrategy: ["FirstPunicWar", "IllyrianWar"],
   Nobilis: ["TribuneOfThePlebs", "IllyrianWar"],
   SecondPunicWar: ["FabianStrategy"],
   MacedonianWar: ["FabianStrategy"],
   CursusHonorum: ["Nobilis"],
   Optimates: ["CursusHonorum"],
   Imperator: ["Optimates"],
   ThirdPunicWar: ["SecondPunicWar", "MacedonianWar"],
   Populares: ["CursusHonorum"],
   MarianReform: ["ThirdPunicWar", "Optimates", "Populares"],
   Proscription: ["Optimates"],
   GallicWars: ["MarianReform"],
   MithridaticWar: ["MarianReform", "Imperator"],
   CaesarsCivilWar: ["Proscription", "Imperator"],
   CaesarsAssassination: ["CaesarsCivilWar", "MithridaticWar", "GallicWars"],
   LiberatorsCivilWar: ["CaesarsAssassination"],
   WarOfActium: ["CaesarsAssassination"],
   FirstCitizen: ["CaesarsAssassination"],
   PaxRomana: ["LiberatorsCivilWar", "WarOfActium", "FirstCitizen"],
});
