import { Assets } from "@pixi/assets";
import { update } from "@tweenjs/tween.js";
import * as debug_PIXI from "pixi.js";
import { Application, Spritesheet } from "pixi.js";
import ReactDOM from "react-dom";
import { Route, Switch } from "wouter";
import altasDef from "../images/textures.json";
import atlas from "../images/textures.png";
import { BG_COLOR } from "./Colors";
import { Building, getBuildingTexture } from "./definitions/BuildingDefinitions";
import { fontBundle } from "./generated/FontBundle";
import {
   GameStateChanged,
   getGameState,
   initializeSavedGame,
   initializeSingletons,
   ISingleton,
   loadGame,
   Singleton,
   SpecialBuildings as ISpecialBuildings,
   syncUITheme,
} from "./Global";
import { Config } from "./logic/Constants";
import { initializeGameState } from "./logic/GameState";
import { ITileData } from "./logic/Tile";
import { tickEveryFrame, tickEverySecond } from "./logic/Update";
import "./main.css";
import { Grid } from "./scenes/Grid";
import { WorldScene } from "./scenes/WorldScene";
import { LoadingPage } from "./ui/LoadingPage";
import { RomeHistoryPage } from "./ui/RomeHistoryPage";
import { RomeProvincePage } from "./ui/RomeProvincePage";
import { TechPage } from "./ui/TechPage";
import { TilePage } from "./ui/TilePage";
import { forEach } from "./utilities/Helper";
import { SceneManager, Textures } from "./utilities/SceneManager";

const ui = document.getElementById("game-ui");

ReactDOM.render(
   <Switch>
      <Route path="/tile/:xy" component={TilePage} />
      <Route path="/tech/:id" component={TechPage} />
      <Route path="/rome-history/:id" component={RomeHistoryPage} />
      <Route path="/rome-province/:id" component={RomeProvincePage} />
      <Route component={LoadingPage} />
   </Switch>,
   ui
);

const canvas = document.getElementById("game-canvas");

const mainBundle = {
   atlas,
};

export type MainBundle = keyof typeof mainBundle;
export type MainBundleAssets = Record<MainBundle, any>;

if (canvas) {
   const app = new Application({
      resizeTo: canvas,
      backgroundColor: BG_COLOR,
   });
   canvas.appendChild(app.view);
   registerPixiInspector();
   Assets.addBundle("main", mainBundle);
   Assets.addBundle("font", fontBundle);
   Assets.loadBundle(["main", "font"])
      .then(({ main }: { main: MainBundleAssets }) => {
         new Spritesheet(main.atlas, altasDef as any)
            .parse()
            .then((textures) => {
               if (textures) {
                  startGame(app, main, textures).catch(console.error);
               }
            })
            .catch(console.error);
      })
      .catch(console.error);
} else {
   console.error("Cannot find #game-canvas, check your HTML setup!");
}

async function startGame(app: Application, resources: MainBundleAssets, textures: Textures) {
   let isNewPlayer = false;
   const data = await loadGame();
   if (data) {
      initializeSavedGame(data);
   } else {
      isNewPlayer = true;
   }
   const gameState = getGameState();

   verifyBuildingTextures(textures);

   const size = Config.City[gameState.city].size;
   const grid = new Grid(size, size, 64);

   if (isNewPlayer) {
      initializeGameState(gameState, grid);
   }

   // GameState is initialized!

   syncUITheme();

   const buildings: Partial<Record<Building, ITileData>> = {};
   forEach(gameState.tiles, (_, tile) => {
      if (tile.building?.type === "Headquarter") {
         console.assert(
            buildings.Headquarter === undefined,
            "There should be only one Headquarter. One =",
            buildings.Headquarter,
            "Another = ",
            tile
         );
         buildings.Headquarter = tile;
      }
   });

   const singletons: ISingleton = {
      sceneManager: new SceneManager({ app, assets: resources, textures, gameState }),
      buildings: buildings as ISpecialBuildings,
      grid,
   };

   initializeSingletons(singletons);

   // Singleton is initialized

   // Singleton().sceneManager.loadScene(RomeScene);
   // Singleton().sceneManager.loadScene(RomeHistoryScene);
   Singleton().sceneManager.loadScene(WorldScene);
   // Singleton().sceneManager.loadScene(TechTreeScene);

   GameStateChanged.emit(getGameState());
   app.ticker.add(() => {
      if (document.visibilityState !== "visible") {
         return;
      }
      update();
      tickEveryFrame(gameState, app.ticker.elapsedMS / 1000);
   });
   setInterval(tickEverySecond.bind(null, gameState), 1000);
}

function verifyBuildingTextures(textures: Textures) {
   forEach(Config.Building, (b) => {
      if (!getBuildingTexture(b, textures)) {
         console.warn(`Cannot find textures for building ${b}`);
      }
   });
}

function registerPixiInspector() {
   // @ts-expect-error
   if (window.__PIXI_INSPECTOR_GLOBAL_HOOK__) {
      // @ts-expect-error
      window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: debug_PIXI });
   }
}
