import { ITechConfigWithAge } from "../definitions/ITechDefinition";
import { RomeHistory, RomeHistoryStage } from "../definitions/RomeHistoryDefinitions";
import { Tech, TechAge } from "../definitions/TechDefinitions";
import { routeTo } from "../Global";
import { getRomeHistoryConfig, getTechConfig } from "../logic/TechLogic";
import { AbstractTechTreeScene } from "./AbstractTechTreeScene";

export class TechTreeScene extends AbstractTechTreeScene<Tech, TechAge> {
   protected readonly config: ITechConfigWithAge<Tech, TechAge> = getTechConfig(this.context.gameState);
   protected readonly verticalAlignment = "top";
   protected onSelected(k: Tech): void {
      routeTo(`/tech/${k}`);
   }
}

export class RomeHistoryScene extends AbstractTechTreeScene<RomeHistory, RomeHistoryStage> {
   protected readonly config: ITechConfigWithAge<RomeHistory, RomeHistoryStage> = getRomeHistoryConfig(
      this.context.gameState
   );
   protected readonly verticalAlignment = "middle";
   protected onSelected(k: RomeHistory): void {
      routeTo(`/rome-history/${k}`);
   }
}
