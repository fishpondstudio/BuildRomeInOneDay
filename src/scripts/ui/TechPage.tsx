import { Unlockable } from "../definitions/CityDefinitions";
import { IUnlockableGroup } from "../definitions/ITechDefinition";
import { IRomeHistoryDefinitions } from "../definitions/RomeHistoryDefinitions";
import { Singleton, useGameState } from "../Global";
import { Config } from "../logic/Constants";
import { getTechTree, getUnlockCost, unlockTech } from "../logic/TechLogic";
import { RomeProvinceScene } from "../scenes/RomeProvinceScene";
import { TechTreeScene } from "../scenes/TechTreeScene";
import { L, t } from "../utilities/i18n";
import { MenuComponent } from "./MenuComponent";
import { TechPrerequisiteItemComponent, TechResearchProgressComponent } from "./TechComponent";
import { UnlockableEffectComponent } from "./UnlockableEffectComponent";

export function TechPage({ id, type }: { id: string; type?: keyof typeof Unlockable }) {
   const gs = useGameState();
   const config: IUnlockableGroup = type ? Unlockable[type] : getTechTree(gs);
   const tech = config.definitions[id];
   const prerequisitesSatisfied = tech.require.every((t) => gs.unlocked[t]);
   return (
      <div className="window">
         <div className="title-bar">
            <div className="title-bar-text">
               {config.verb()}: {tech.name()}
            </div>
         </div>
         <MenuComponent />
         <div className="window-body">
            <fieldset>
               <legend>{t(L.TechnologyPrerequisite)}</legend>
               {tech.require.map((prerequisite) => {
                  return (
                     <TechPrerequisiteItemComponent
                        key={prerequisite}
                        name={
                           <>
                              {config.verb()} <b>{config.definitions[prerequisite].name()}</b>
                           </>
                        }
                        unlocked={!!gs.unlocked[prerequisite]}
                        action={() =>
                           Singleton().sceneManager.loadScene(TechTreeScene)?.selectNode(prerequisite, "animate")
                        }
                     />
                  );
               })}
               {(tech as IRomeHistoryDefinitions).requireProvince?.map((province) => {
                  return (
                     <TechPrerequisiteItemComponent
                        key={province}
                        name={
                           <>
                              {t(L.Annex)} <b>{Config.RomeProvince[province].name()}</b>
                           </>
                        }
                        unlocked={!!gs.unlocked[province]}
                        action={() => Singleton().sceneManager.loadScene(RomeProvinceScene)?.selectProvince(province)}
                     />
                  );
               })}
               {tech.require.length === 0 ? <div>{t(L.TechnologyNoPrerequisite)}</div> : null}
            </fieldset>
            <TechResearchProgressComponent
               name={tech.name()}
               unlocked={!!gs.unlocked[id]}
               prerequisite={prerequisitesSatisfied}
               resource="Science"
               unlockLabel={t(L.UnlockBuilding)}
               unlockCost={getUnlockCost(tech)}
               onUnlocked={() => {
                  unlockTech(id, gs);
                  Singleton().sceneManager.getCurrent(TechTreeScene)?.renderTechTree("animate");
               }}
               gameState={gs}
            />
            <UnlockableEffectComponent definition={tech} gameState={gs} />
         </div>
      </div>
   );
}
