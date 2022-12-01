import { L, t } from "../utilities/i18n";
import { TechAge } from "./TechDefinitions";

export class GreatPersonDefinitions {
   Hammurabi: IGreatPersonDefinition = {
      name: () => t(L.Hammurabi),
      age: "BronzeAge",
      time: "c. 1800s BC",
   };

   TangOfShang: IGreatPersonDefinition = {
      name: () => t(L.TangOfShang),
      age: "BronzeAge",
      time: "c. 1600s BC",
   };

   RamessesII: IGreatPersonDefinition = {
      name: () => t(L.RamessesII),
      age: "BronzeAge",
      time: "c. 1300s BC",
   };

   Agamemnon: IGreatPersonDefinition = {
      name: () => t(L.Agamemnon),
      age: "BronzeAge",
      time: "c. 1200s BC",
   };

   SargonOfAkkad: IGreatPersonDefinition = {
      name: () => t(L.SargonOfAkkad),
      age: "BronzeAge",
      time: "c. 2300s BC",
   };

   Khufu: IGreatPersonDefinition = {
      name: () => t(L.Khufu),
      age: "BronzeAge",
      time: "c. 2500s BC",
   };

   Dido: IGreatPersonDefinition = {
      name: () => t(L.Dido),
      age: "IronAge",
      time: "c. 800s BC",
   };

   Homer: IGreatPersonDefinition = {
      name: () => t(L.Homer),
      age: "IronAge",
      time: "c. 800s BC",
   };

   DukeOfZhou: IGreatPersonDefinition = {
      name: () => t(L.DukeOfZhou),
      age: "IronAge",
      time: "c. 1000s BC",
   };

   Ashurbanipal: IGreatPersonDefinition = {
      name: () => t(L.Ashurbanipal),
      age: "IronAge",
      time: "c. 600s BC",
   };

   NebuchadnezzarII: IGreatPersonDefinition = {
      name: () => t(L.NebuchadnezzarII),
      age: "IronAge",
      time: "c. 500s BC",
   };

   LaoZi: IGreatPersonDefinition = {
      name: () => t(L.LaoZi),
      age: "IronAge",
      time: "c. 600s BC",
   };

   Solon: IGreatPersonDefinition = {
      name: () => t(L.Solon),
      age: "IronAge",
      time: "c. 600s BC",
   };

   CyrusII: IGreatPersonDefinition = {
      name: () => t(L.CyrusII),
      age: "IronAge",
      time: "c. 500s BC",
   };

   DariusI: IGreatPersonDefinition = {
      name: () => t(L.DariusI),
      age: "IronAge",
      time: "c. 500s BC",
   };

   Confucius: IGreatPersonDefinition = {
      name: () => t(L.Confucius),
      age: "IronAge",
      time: "c. 500s BC",
   };

   Socrates: IGreatPersonDefinition = {
      name: () => t(L.Socrates),
      age: "ClassicalAge",
      time: "c. 400s BC",
   };

   Aeschylus: IGreatPersonDefinition = {
      name: () => t(L.Aeschylus),
      age: "ClassicalAge",
      time: "c. 400s BC",
   };

   Protagoras: IGreatPersonDefinition = {
      name: () => t(L.Protagoras),
      age: "ClassicalAge",
      time: "c. 400s BC",
   };

   Herodotus: IGreatPersonDefinition = {
      name: () => t(L.Herodotus),
      age: "ClassicalAge",
      time: "c. 400s BC",
   };

   Hippocrates: IGreatPersonDefinition = {
      name: () => t(L.Hippocrates),
      age: "ClassicalAge",
      time: "c. 400s BC",
   };

   Plato: IGreatPersonDefinition = {
      name: () => t(L.Plato),
      age: "ClassicalAge",
      time: "c. 300s BC",
   };

   Aristotle: IGreatPersonDefinition = {
      name: () => t(L.Aristotle),
      age: "ClassicalAge",
      time: "c. 300s BC",
   };

   AlexanderIII: IGreatPersonDefinition = {
      name: () => t(L.AlexanderIII),
      age: "ClassicalAge",
      time: "c. 300s BC",
   };

   Ashoka: IGreatPersonDefinition = {
      name: () => t(L.Ashoka),
      age: "ClassicalAge",
      time: "c. 200s BC",
   };

   Hannibal: IGreatPersonDefinition = {
      name: () => t(L.Hannibal),
      age: "ClassicalAge",
      time: "c. 200s BC",
   };

   QinShiHuang: IGreatPersonDefinition = {
      name: () => t(L.QinShiHuang),
      age: "ClassicalAge",
      time: "c. 200s BC",
   };

   JuliusCaesar: IGreatPersonDefinition = {
      name: () => t(L.JuliusCaesar),
      age: "ClassicalAge",
      time: "100 BC ~ 44 BC",
   };

   SimaQian: IGreatPersonDefinition = {
      name: () => t(L.SimaQian),
      age: "ClassicalAge",
      time: "c. 100s BC",
   };

   Augustus: IGreatPersonDefinition = {
      name: () => t(L.Augustus),
      age: "ClassicalAge",
      time: "27 BC ~ 14 BC",
   };

   CaiLun: IGreatPersonDefinition = {
      name: () => t(L.CaiLun),
      age: "ClassicalAge",
      time: "63 AD ~ 121 AD",
   };

   Cleopatra: IGreatPersonDefinition = {
      name: () => t(L.Cleopatra),
      age: "ClassicalAge",
      time: "69 BC ~ 30 BC",
   };
}

export type GreatPerson = keyof GreatPersonDefinitions;

export interface IGreatPersonDefinition {
   name: () => string;
   age: TechAge;
   time: string;
}
