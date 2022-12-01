import { Resource } from "../definitions/ResourceDefinitions";
import { notifyGameStateUpdate } from "../Global";
import { Config } from "../logic/Constants";
import { GameState } from "../logic/GameState";
import { getResourceAmount, trySpendResource } from "../logic/ResourceLogic";
import { L, t } from "../utilities/i18n";
import { FormatNumber } from "./HelperComponents";
import { ProgressBarComponent } from "./ProgressBarComponent";

export function TechResearchProgressComponent({
   name,
   unlocked,
   prerequisite,
   resource,
   unlockCost,
   unlockLabel,
   onUnlocked,
   gameState,
}: {
   name: string;
   unlocked: boolean;
   prerequisite: boolean;
   resource: Resource;
   unlockCost: number;
   unlockLabel: string;
   onUnlocked: () => void;
   gameState: GameState;
}) {
   const availableAmount = getResourceAmount(resource, gameState);
   return (
      <fieldset>
         <legend>{t(L.Progress)}</legend>
         {unlocked ? (
            <div className="row text-green">
               <div className="m-icon small mr5">check_circle</div>
               <div>{t(L.TechHasBeenUnlocked, { tech: name })}</div>
            </div>
         ) : (
            <>
               <ProgressBarComponent progress={availableAmount / unlockCost} />
               <div className="sep5" />
               <div className="row mv5">
                  {availableAmount >= unlockCost ? (
                     <div className="m-icon small text-green mr5">check_circle</div>
                  ) : (
                     <div className="m-icon small text-red mr5">cancel</div>
                  )}
                  <div className="mr5">{Config.Resource[resource].name()}: </div>
                  <div className="mr5">
                     <FormatNumber value={availableAmount} /> /{" "}
                     <strong>
                        <FormatNumber value={unlockCost} />
                     </strong>
                  </div>
                  <div className="f1" />
                  <button
                     disabled={!prerequisite || availableAmount < unlockCost}
                     onClick={() => {
                        if (!trySpendResource(resource, unlockCost, gameState)) {
                           return;
                        }
                        notifyGameStateUpdate();
                        onUnlocked();
                     }}
                  >
                     {unlockLabel}
                  </button>
               </div>
            </>
         )}
      </fieldset>
   );
}

export function TechPrerequisiteItemComponent({
   name,
   unlocked,
   action,
}: {
   name: string;
   unlocked: boolean;
   action: () => void;
}) {
   return (
      <div className="row mv5">
         {unlocked ? (
            <div className="m-icon small text-green mr5">check_circle</div>
         ) : (
            <div className="m-icon small text-red mr5">cancel</div>
         )}
         <div className="f1">{name}</div>
         <div className="text-link" onClick={action}>
            {t(L.ViewTechnology)}
         </div>
      </div>
   );
}
