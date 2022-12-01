import { notifyGameStateUpdate } from "../Global";
import { Tick } from "../logic/TickLogic";
import { STOCKPILE_CAPACITY_MAX, STOCKPILE_CAPACITY_MIN, STOCKPILE_MAX_MAX, STOCKPILE_MAX_MIN } from "../logic/Tile";
import { isEmpty } from "../utilities/Helper";
import { L, t } from "../utilities/i18n";
import { IBuildingComponentProps } from "./BuildingPage";

export function BuildingStockpileComponent({ gameState, xy }: IBuildingComponentProps) {
   const building = gameState.tiles[xy].building;
   if (building == null || isEmpty(Tick.current.buildings[building.type].input)) {
      return null;
   }
   if (!gameState.unlockedTech.Pictograph && !gameState.unlockedRomeHistory.Consul) {
      return null;
   }
   return (
      <fieldset>
         <legend>
            {t(L.StockpileSettings)}: {building.stockpileCapacity}x
         </legend>

         <div className="sep5"></div>
         <input
            type="range"
            min={STOCKPILE_CAPACITY_MIN}
            max={STOCKPILE_CAPACITY_MAX}
            value={building.stockpileCapacity}
            onChange={(e) => {
               building.stockpileCapacity = parseInt(e.target.value, 10);
               notifyGameStateUpdate();
            }}
         />
         <div className="sep15"></div>
         <div className="text-desc">{t(L.StockpileDesc, { capacity: building.stockpileCapacity })}</div>
         <div className="sep10"></div>
         <div className="separator has-title">
            <div>
               {t(L.StockpileMax)}:{" "}
               {building.stockpileMax <= 0 ? t(L.StockpileMaxUnlimited) : `${building.stockpileMax}x`}
            </div>
         </div>
         <div className="sep5"></div>
         <input
            type="range"
            min={STOCKPILE_MAX_MIN}
            max={STOCKPILE_MAX_MAX}
            step="5"
            value={building.stockpileMax}
            onChange={(e) => {
               building.stockpileMax = parseInt(e.target.value, 10);
               notifyGameStateUpdate();
            }}
         />
         <div className="sep15"></div>
         <div className="text-desc">
            {building.stockpileMax <= 0
               ? t(L.StockpileMaxUnlimitedDesc)
               : t(L.StockpileMaxDesc, { cycle: building.stockpileMax })}
         </div>
      </fieldset>
   );
}
