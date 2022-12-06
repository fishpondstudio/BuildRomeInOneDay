import { L, t } from "../utilities/i18n";
import { IUnlockableDefinition } from "./ITechDefinition";

export interface IProvince extends IUnlockableDefinition {
   visual: IProvinceVisual;
   unlockCost: number;
}

export interface IProvinceVisual {
   x: number;
   y: number;
   textX?: number;
   textY?: number;
   textSize?: number;
   textAngle?: number;
}

export class RomeProvinceDefinitions {
   Hispania: IProvince = {
      visual: { x: 415, y: 864, textSize: 100, textX: -75 },
      unlockCost: 4000,
      name: () => t(L.ProvinceHispania),
      buildingMultiplier: { LivestockFarm: { input: 1, output: 1 } },
   };
   Cantabri: IProvince = {
      visual: { x: 480, y: 685, textAngle: 15, textX: -20, textY: -15 },
      unlockCost: 1000,
      name: () => t(L.ProvinceCantabri),
      buildingMultiplier: { LivestockFarm: { worker: 1, storage: 1 } },
   };
   Gallia: IProvince = {
      visual: { x: 796, y: 408, textSize: 100 },
      unlockCost: 5000,
      name: () => t(L.ProvinceGallia),
      buildingMultiplier: { Hut: { storage: 1, output: 1 } },
   };
   GalliaTransalpina: IProvince = {
      visual: { x: 895, y: 630, textAngle: -30, textX: -55, textY: 10, textSize: 40 },
      unlockCost: 5000,
      name: () => t(L.ProvinceGalliaTransalpina),
      buildingMultiplier: { LivestockFarm: { worker: 1, storage: 1 } },
   };
   GalliaCisalpina: IProvince = {
      visual: { x: 1210, y: 585, textX: -40, textY: -20, textAngle: -20, textSize: 40 },
      unlockCost: 2000,
      name: () => t(L.ProvinceGalliaCisalpina),
      globalMultiplier: { sciencePerBusyWorker: 1 },
   };
   Italia: IProvince = {
      visual: { x: 1398, y: 875, textAngle: 30, textSize: 70, textY: -50 },
      unlockCost: 1000,
      buildingMultiplier: {
         Headquarter: { output: 1 },
      },
      name: () => t(L.ProvinceItalia),
   };
   Illyricum: IProvince = {
      visual: { x: 1545, y: 667, textAngle: 30, textSize: 30, textX: -30, textY: 15 },
      unlockCost: 2000,
      buildingMultiplier: { Farmland: { output: 1, storage: 1 } },
      name: () => t(L.ProvinceIllyricum),
   };
   Macedonia: IProvince = {
      visual: { x: 1949, y: 968, textX: -130, textY: -60, textAngle: 45 },
      unlockCost: 4000,
      buildingMultiplier: {
         IronMiningCamp: { output: 1, storage: 1 },
      },
      name: () => t(L.ProvinceMacedonia),
   };
   SardiniaAndCorsica: IProvince = {
      visual: { x: 1105, y: 889, textSize: 35, textY: 50 },
      unlockCost: 2000,
      name: () => t(L.ProvinceSardiniaAndCorsica),
      buildingMultiplier: { Villa: { input: 1, output: 1, worker: 1 } },
   };
   Sicillia: IProvince = {
      visual: { x: 1394, y: 1141, textSize: 35, textY: -20, textX: 10 },
      unlockCost: 2000,
      name: () => t(L.ProvinceSicillia),
      globalMultiplier: { sciencePerBusyWorker: 1 },
   };
   Bithynia: IProvince = {
      visual: { x: 2436, y: 725, textAngle: -35, textX: -15 },
      unlockCost: 5000,
      name: () => t(L.ProvinceBithynia),
      buildingMultiplier: { LoggingCamp: { output: 1, worker: 1 } },
   };
   Asia: IProvince = {
      visual: { x: 2304, y: 928, textSize: 100, textX: -20 },
      unlockCost: 4000,
      name: () => t(L.ProvinceAsia),
      buildingMultiplier: { LivestockFarm: { output: 1, worker: 1 } },
   };
   Galatia: IProvince = {
      visual: { x: 2454, y: 856, textSize: 30, textX: -10 },
      unlockCost: 3000,
      name: () => t(L.ProvinceGalatia),
      buildingMultiplier: { LivestockFarm: { output: 1, worker: 1 } },
   };
   Pontus: IProvince = {
      visual: { x: 2722, y: 689, textAngle: -20, textSize: 70 },
      unlockCost: 4000,
      name: () => t(L.ProvincePontus),
      buildingMultiplier: { Farmland: { output: 1, worker: 1 } },
   };
   Cappadocia: IProvince = {
      visual: { x: 2681, y: 881, textAngle: -10 },
      unlockCost: 4000,
      name: () => t(L.ProvinceCappadocia),
      buildingMultiplier: { IronMiningCamp: { output: 1, worker: 1 } },
   };
   Cilicia: IProvince = {
      visual: { x: 2610, y: 1007, textAngle: -40, textX: -60, textY: 5, textSize: 45 },
      unlockCost: 4000,
      name: () => t(L.ProvinceCilicia),
      buildingMultiplier: { IronMiningCamp: { storage: 1 } },
   };
   Sophene: IProvince = {
      visual: { x: 2878, y: 809, textSize: 30, textY: -15 },
      unlockCost: 5000,
      name: () => t(L.ProvinceSophene),
      buildingMultiplier: { CopperMiningCamp: { output: 1, worker: 1, storage: 1 } },
   };
   Lycia: IProvince = {
      visual: { x: 2333, y: 1081, textSize: 30 },
      unlockCost: 4000,
      name: () => t(L.ProvinceLycia),
      buildingMultiplier: { Blacksmith: { worker: 1, storage: 1 } },
   };
   Commagene: IProvince = {
      visual: { x: 2861, y: 934, textSize: 25, textAngle: -80, textX: 10 },
      unlockCost: 4000,
      name: () => t(L.ProvinceCommagene),
      buildingMultiplier: { Armory: { worker: 1, storage: 1 } },
   };
   Judia: IProvince = {
      visual: { x: 2825, y: 1245, textAngle: -80, textX: -60, textY: 80 },
      unlockCost: 4000,
      name: () => t(L.ProvinceJudia),
      buildingMultiplier: { IronForge: { worker: 1, storage: 1 } },
   };
   Creta: IProvince = {
      visual: { x: 2066, y: 1244, textSize: 30, textY: -5, textX: 15 },
      unlockCost: 2000,
      name: () => t(L.ProvinceCreta),
      buildingMultiplier: { Barrack: { worker: 1, storage: 1 } },
   };
   Syria: IProvince = {
      visual: { x: 2781, y: 1141, textY: -80 },
      unlockCost: 1000,
      name: () => t(L.ProvinceSyria),
      buildingMultiplier: { Blacksmith: { input: 1, output: 1 } },
   };
   Cyprus: IProvince = {
      visual: { x: 2575, y: 1132, textSize: 25, textAngle: -30, textX: -10, textY: 10 },
      unlockCost: 2000,
      name: () => t(L.ProvinceCyprus),
      buildingMultiplier: { StoneQuarry: { output: 1, storage: 1 } },
   };
   Aegyptus: IProvince = {
      visual: { x: 2463, y: 1573, textSize: 80, textX: -20 },
      unlockCost: 6000,
      name: () => t(L.ProvinceAegyptus),
      buildingMultiplier: { Farmland: { output: 1, worker: 1 }, LivestockFarm: { output: 1, worker: 1 } },
   };
   Cyrene: IProvince = {
      visual: { x: 1948, y: 1574, textY: -50, textSize: 60 },
      unlockCost: 4000,
      name: () => t(L.ProvinceCyrene),
      buildingMultiplier: { StoneQuarry: { storage: 1 }, StonemasonsWorkshop: { storage: 1 } },
   };
   Africa: IProvince = {
      visual: { x: 1393, y: 1435, textAngle: 35, textY: 120, textX: 50 },
      unlockCost: 5000,
      name: () => t(L.ProvinceAfrica),
      buildingMultiplier: { Villa: { worker: 1, storage: 1 }, Insula: { worker: 1, storage: 1 } },
   };
   Numidia: IProvince = {
      visual: { x: 988, y: 1275, textSize: 35, textY: 20 },
      unlockCost: 5000,
      name: () => t(L.ProvinceNumidia),
      buildingMultiplier: { Brewery: { input: 1, output: 1, worker: 1, storage: 1 } },
   };
   Mauretania: IProvince = {
      visual: { x: 529, y: 1264, textY: 20, textAngle: -5, textSize: 70 },
      unlockCost: 5000,
      name: () => t(L.ProvinceMauretania),
      buildingMultiplier: { Aqueduct: { output: 1, worker: 1, storage: 1 } },
   };
}

export type RomeProvince = keyof RomeProvinceDefinitions;
