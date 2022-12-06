import { Tech, TechUnlockDefinitions } from "../definitions/TechDefinitions";
import { Singleton, useGameState } from "../Global";
import { Config } from "../logic/Constants";
import { getAgeForTech, getTechTree, getUnlockCost, unlockTech } from "../logic/TechLogic";
import { TechTreeScene } from "../scenes/TechTreeScene";
import { L, t } from "../utilities/i18n";
import { MenuComponent } from "./MenuComponent";
import { TechPrerequisiteItemComponent, TechResearchProgressComponent } from "./TechComponent";
import { UnlockableEffectComponent } from "./UnlockableEffectComponent";

export function TechPage({ params }: { params: { id: Tech } }) {
   const id = params.id;
   const tech = Config.Tech[id];
   const gs = useGameState();
   const config = getTechTree(gs);
   const prerequisites = TechUnlockDefinitions[id];
   const prerequisitesSatisfied = prerequisites.every((t) => gs.unlocked[t]);
   return (
      <div className="window">
         <div className="title-bar">
            <div className="title-bar-text">
               {t(L.Research)}: {tech.name()}
            </div>
         </div>
         <MenuComponent />
         <div className="window-body">
            <fieldset>
               <legend>{t(L.TechnologyPrerequisite)}</legend>
               {prerequisites.map((prerequisite) => {
                  const techAge = getAgeForTech(prerequisite, gs);
                  const techAgeLabel = techAge ? `(${config.ages[techAge].name()})` : "";
                  return (
                     <TechPrerequisiteItemComponent
                        name={`${config.definitions[prerequisite].name()} ${techAgeLabel}`}
                        unlocked={!!gs.unlocked[prerequisite]}
                        action={() =>
                           Singleton().sceneManager.getCurrent(TechTreeScene)?.selectNode(prerequisite, "animate")
                        }
                     />
                  );
               })}
               {prerequisites.length === 0 ? <div>{t(L.TechnologyNoPrerequisite)}</div> : null}
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
