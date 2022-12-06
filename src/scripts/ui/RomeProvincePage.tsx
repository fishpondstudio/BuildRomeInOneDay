import { RomeProvince } from "../definitions/RomeProvinceDefinitions";
import { Singleton, useGameState } from "../Global";
import { Config } from "../logic/Constants";
import { RomeProvinceScene } from "../scenes/RomeProvinceScene";
import { L, t } from "../utilities/i18n";
import { MenuComponent } from "./MenuComponent";
import { TechResearchProgressComponent } from "./TechComponent";
import { UnlockableEffectComponent } from "./UnlockableEffectComponent";

export function RomeProvincePage({ params }: { params: { id: RomeProvince } }) {
   const id = params.id;
   const def = Config.RomeProvince[id];
   const name = def.name();
   const gs = useGameState();
   return (
      <div className="window">
         <div className="title-bar">
            <div className="title-bar-text">
               {t(L.Province)}: {name}
            </div>
         </div>
         <MenuComponent />
         <div className="window-body">
            <TechResearchProgressComponent
               name={name}
               unlocked={!!gs.unlocked[id]}
               prerequisite={true}
               resource="Legion"
               unlockCost={def.unlockCost}
               unlockLabel={t(L.AnnexProvinceButton)}
               onUnlocked={() => {
                  gs.unlocked[id] = true;
                  Singleton().sceneManager.getCurrent(RomeProvinceScene)?.selectProvince(id)?.annex();
               }}
               gameState={gs}
            />
            <UnlockableEffectComponent definition={def} gameState={gs} />
         </div>
      </div>
   );
}
