import { L, t } from "../utilities/i18n";
import { Deposit } from "./ResourceDefinitions";

export class CityDefinitions {
   Rome: ICityDefinition = {
      deposits: {
         Water: 0.02,
         Copper: 0.02,
         Iron: 0.02,
         Wood: 0.02,
         Stone: 0.02,
      },
      size: 20,
      name: () => t(L.Athens),
   };
}

export type City = keyof CityDefinitions;

interface ICityDefinition {
   deposits: Record<Deposit, number>;
   size: number;
   name: () => string;
}
