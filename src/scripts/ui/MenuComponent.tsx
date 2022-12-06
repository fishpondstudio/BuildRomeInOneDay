import classNames from "classnames";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useRoute } from "wouter";
import { getGameOptions, getGameState, Singleton, syncUITheme } from "../Global";
import { RomeProvinceScene } from "../scenes/RomeProvinceScene";
import { TechTreeScene } from "../scenes/TechTreeScene";
import { WorldScene } from "../scenes/WorldScene";
import { L, t } from "../utilities/i18n";

type MenuItemOptions = "view" | "options" | null;

function MenuButton({ name }: { name: string }) {
   return (
      <>
         <span className="menu-hotkey">{name.substring(0, 1)}</span>
         {name.substring(1)}
      </>
   );
}

function MenuItem({ visible, children }: PropsWithChildren<{ visible: boolean }>) {
   return (
      <>
         <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            style={{
               fill: "currentcolor",
               display: "inline-block",
               verticalAlign: "middle",
               visibility: visible ? "visible" : "hidden",
               marginRight: "2px",
               marginLeft: "2px",
            }}
         >
            <path d="M5 7v3l2 2 5-5V4L7 9Z"></path>
         </svg>
         {children}
      </>
   );
}

export function MenuComponent() {
   const [active, setActive] = useState<MenuItemOptions>(null);
   const buttonRef = useRef(null);
   const [match, params] = useRoute("/tile/:xy");

   useEffect(() => {
      function onPointerDown(e: PointerEvent) {
         setActive(null);
      }
      window.addEventListener("pointerdown", onPointerDown);
      return () => {
         window.removeEventListener("pointerdown", onPointerDown);
      };
   }, []);

   return (
      <>
         <div className="menus">
            <div
               ref={buttonRef}
               className={classNames({
                  "menu-button": true,
                  active: active === "view",
               })}
               onPointerDown={(e) => {
                  e.nativeEvent.stopPropagation();
                  active === "view" ? setActive(null) : setActive("view");
               }}
               onPointerOver={(e) => {
                  if (active !== null && active !== "view") {
                     setActive("view");
                  }
               }}
            >
               <MenuButton name={t(L.ViewMenu)} />
               <div
                  className={classNames({
                     "menu-popover": true,
                     active: active === "view",
                  })}
               >
                  <div
                     className="menu-popover-item"
                     onPointerDown={(e) => {
                        Singleton().sceneManager.loadScene(WorldScene);
                        setActive(null);
                     }}
                  >
                     <MenuItem visible={Singleton().sceneManager.isCurrent(WorldScene)}>{t(L.CityViewMap)}</MenuItem>
                  </div>
                  {/* <div
                        
                            className="menu-popover-item"
                            onPointerDown={(e) => {
                                Singleton().sceneManager.loadScene(TechTreeScene);
                                setActive(null);
                            }}
                        >
                            <MenuItem visible={Singleton().sceneManager.isCurrent(TechTreeScene)}>
                                {t(L.TechnologyMenu)}
                            </MenuItem>
                        </div> */}
                  <div
                     className="menu-popover-item"
                     onPointerDown={(e) => {
                        Singleton().sceneManager.loadScene(TechTreeScene);
                        setActive(null);
                     }}
                  >
                     <MenuItem visible={Singleton().sceneManager.isCurrent(TechTreeScene)}>
                        {t(L.ResearchMenu)}
                     </MenuItem>
                  </div>
                  <div
                     className="menu-popover-item"
                     onPointerDown={(e) => {
                        Singleton().sceneManager.loadScene(RomeProvinceScene);
                        setActive(null);
                     }}
                  >
                     <MenuItem visible={Singleton().sceneManager.isCurrent(RomeProvinceScene)}>
                        {t(L.RomeMapMenu)}
                     </MenuItem>
                  </div>
               </div>
            </div>
            <div
               ref={buttonRef}
               className={classNames({
                  "menu-button": true,
                  active: active === "options",
               })}
               onPointerDown={(e) => {
                  e.nativeEvent.stopPropagation();
                  active === "options" ? setActive(null) : setActive("options");
               }}
               onPointerOver={(e) => {
                  if (active !== null && active !== "options") {
                     setActive("options");
                  }
               }}
            >
               <MenuButton name={t(L.OptionsMenu)} />
               <div
                  className={classNames({
                     "menu-popover": true,
                     active: active === "options",
                  })}
               >
                  <div
                     className="menu-popover-item"
                     onPointerDown={() => {
                        getGameOptions().useModernUI = !getGameOptions().useModernUI;
                        syncUITheme();
                        setActive(null);
                     }}
                  >
                     <MenuItem visible={getGameOptions().useModernUI}>{t(L.OptionsUseModernUI)}</MenuItem>
                  </div>
               </div>
            </div>
            <div
               className="menu-button"
               onClick={() => {
                  if (import.meta.env.PROD) {
                     return;
                  }
                  if (match && params.xy) {
                     console.log(getGameState().tiles[params.xy]);
                  }
               }}
            >
               <span className="menu-hotkey">H</span>elp
            </div>
         </div>
         <div className="separator"></div>
      </>
   );
}
