import { RomeHistory, RomeHistoryUnlockDefinitions } from "../definitions/RomeHistoryDefinitions";
import { Singleton, useGameState } from "../Global";
import { Config } from "../logic/Constants";
import { getAgeForTech, getRomeHistoryConfig, getUnlockCost, unlockTech } from "../logic/TechLogic";
import { RomeProvinceScene } from "../scenes/RomeProvinceScene";
import { RomeHistoryScene } from "../scenes/TechTreeScene";
import { L, t } from "../utilities/i18n";
import { MenuComponent } from "./MenuComponent";
import { TechPrerequisiteItemComponent, TechResearchProgressComponent } from "./TechComponent";
import { UnlockableEffectComponent } from "./UnlockableEffectComponent";

export function RomeHistoryPage({ params }: { params: { id: RomeHistory } }) {
   const tech = params.id;
   const def = Config.RomeHistory[tech];
   const gs = useGameState();
   const config = getRomeHistoryConfig(gs);
   const prerequisites = RomeHistoryUnlockDefinitions[tech];
   const provinces = def.requireProvince ?? [];
   return (
      <div className="window">
         <div className="title-bar">
            <div className="title-bar-text">
               {t(L.Research)}: {def.name()}
            </div>
         </div>
         <MenuComponent />
         <div className="window-body">
            <fieldset>
               <legend>{t(L.TechnologyPrerequisite)}</legend>
               {prerequisites.map((prerequisite) => {
                  const techAge = getAgeForTech(prerequisite, config);
                  const techAgeLabel = techAge ? `(${Config.RomeHistoryStage[techAge].name()})` : "";
                  return (
                     <TechPrerequisiteItemComponent
                        key={prerequisite}
                        name={`${config.definitions[prerequisite].name()} ${techAgeLabel}`}
                        unlocked={!!config.unlocked[prerequisite]}
                        action={() =>
                           Singleton().sceneManager.getCurrent(RomeHistoryScene)?.selectNode(prerequisite, "animate")
                        }
                     />
                  );
               })}
               {provinces.map((province) => {
                  return (
                     <TechPrerequisiteItemComponent
                        key={province}
                        name={t(L.AnnexProvince, { name: Config.RomeProvince[province].name() })}
                        unlocked={!!gs.annexedProvince[province]}
                        action={() => Singleton().sceneManager.loadScene(RomeProvinceScene)?.selectProvince(province)}
                     />
                  );
               })}
               {prerequisites.length === 0 ? <div>{t(L.TechnologyNoPrerequisite)}</div> : null}
            </fieldset>
            <TechResearchProgressComponent
               name={def.name()}
               unlocked={!!config.unlocked[tech]}
               prerequisite={
                  prerequisites.every((t) => gs.unlockedRomeHistory[t]) && provinces.every((p) => gs.annexedProvince[p])
               }
               resource="Science"
               unlockCost={getUnlockCost(def)}
               unlockLabel={t(L.UnlockBuilding)}
               onUnlocked={() => {
                  unlockTech(tech, config, gs);
                  Singleton().sceneManager.getCurrent(RomeHistoryScene)?.renderTechTree("animate");
               }}
               gameState={gs}
            />
            <UnlockableEffectComponent definition={def} gameState={gs} />
         </div>
      </div>
   );
}
