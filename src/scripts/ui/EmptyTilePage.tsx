import { useState } from "react";
import { Building } from "../definitions/BuildingDefinitions";
import { notifyGameStateUpdate, useGameState } from "../Global";
import { getBuildingCost } from "../logic/BuildingLogic";
import { Config } from "../logic/Constants";
import { getBuildingsByType, unlockedBuildings } from "../logic/IntraTickCache";
import { Tick } from "../logic/TickLogic";
import { ITileData, makeBuilding } from "../logic/Tile";
import { jsxMapOf, keysOf, setContains } from "../utilities/Helper";
import { L, t } from "../utilities/i18n";
import { MenuComponent } from "./MenuComponent";

export function EmptyTilePage({ tile }: { tile: ITileData }): JSX.Element {
   const gs = useGameState();
   const [, setSelected] = useState<Building | null>(null);
   const constructed = getBuildingsByType(gs);
   return (
      <div className="window" onPointerDown={() => setSelected(null)}>
         <div className="title-bar">
            <div className="title-bar-text">{t(L.Tile)}</div>
         </div>
         <MenuComponent />
         <div className="window-body">
            <fieldset>
               <legend>{t(L.Deposit)}</legend>
               {jsxMapOf(
                  tile.deposit,
                  (k, v) => {
                     return (
                        <div key={k} className="row mv5">
                           <div className="f1">{Tick.current.resources[k].name()}</div>
                           <div className="m-icon small text-link">visibility</div>
                        </div>
                     );
                  },
                  () => {
                     return <div className="text-desc">{t(L.NoDepositDesc)}</div>;
                  }
               )}
            </fieldset>
            <fieldset>
               <legend>{t(L.BuildingANew)}</legend>
               <input type="text" style={{ width: "100%" }} placeholder={t(L.BuildingSearchText)} />
            </fieldset>
            <div className="table-view">
               <table>
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th className="right">Cost</th>
                        <th />
                     </tr>
                  </thead>
                  <tbody>
                     {keysOf(unlockedBuildings(gs))
                        .sort((a, b) => (Config.BuildingTier[a] ?? 0) - (Config.BuildingTier[b] ?? 0))
                        .map((k) => {
                           if ((constructed[k]?.length ?? 0) >= (Tick.current.buildings[k].max ?? Infinity)) {
                              return null;
                           }
                           const building = Tick.current.buildings[k];
                           return (
                              <tr
                                 key={k}
                                 onPointerDown={(e) => {
                                    setSelected(k);
                                    e.stopPropagation();
                                 }}
                              >
                                 <td>
                                    <div className="row">
                                       <div>{building.name()}</div>
                                       {building.deposit && setContains(tile.deposit, building.deposit) ? (
                                          <div className="m-icon small text-orange ml5">stars</div>
                                       ) : null}
                                    </div>
                                 </td>
                                 <td className="right">
                                    {jsxMapOf(getBuildingCost({ type: k, level: 1 }), (res, amount) => {
                                       return (
                                          <div key={res}>
                                             {Tick.current.resources[res].name()} x{amount}
                                          </div>
                                       );
                                    })}
                                 </td>
                                 <td>
                                    <div
                                       className="row text-link"
                                       onClick={() => {
                                          tile.building = makeBuilding({ type: k });
                                          notifyGameStateUpdate();
                                       }}
                                    >
                                       <div className="f1" />
                                       <div className="m-icon small">construction</div>
                                       <div className="text-link">{t(L.Build)}</div>
                                    </div>
                                 </td>
                              </tr>
                           );
                        })}
                  </tbody>
               </table>
            </div>
         </div>
         {/* <ReactModal
                isOpen={true}
                parentSelector={() => document.getElementById("game-ui")!}
                overlayClassName="modal-overlay"
                className="modal-content"
            >
                <div className="window">
                    <div className="title-bar">
                        <div className="title-bar-text">A Great Person was Born</div>
                    </div>
                    <div className="window-body">
                        {jsxMapOf(Config.GreatPerson, (k) => {
                            return (
                                <img
                                    src={greatPersonImage(k, Singleton().sceneManager.getContext())}
                                    style={{ width: "18%", margin: "1%" }}
                                />
                            );
                        })}
                    </div>
                </div>
            </ReactModal> */}
      </div>
   );
}
