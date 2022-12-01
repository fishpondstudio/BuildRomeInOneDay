import { SmoothGraphics } from "@pixi/graphics-smooth";
import { Easing, Tween } from "@tweenjs/tween.js";
import { Viewport } from "pixi-viewport";
import { BitmapText, Container, LINE_CAP, LINE_JOIN, Rectangle } from "pixi.js";
import { BG_COLOR } from "../Colors";
import { ITechConfigWithAge } from "../definitions/ITechDefinition";
import { Fonts } from "../generated/FontBundle";
import { isAgeUnlocked, unlockableTechs } from "../logic/TechLogic";
import { forEach } from "../utilities/Helper";
import { Scene } from "../utilities/SceneManager";

const BOX_WIDTH = 300;
const BOX_HEIGHT = 100;
const COLUMN_WIDTH = 500;
const PAGE_HEIGHT = 1000;
const HEADER_TOTAL_HEIGHT = 160;
const HEADER_BOX_HEIGHT = 70;

const LOCKED_COLOR = 0xbebebe;
const UNLOCKED_COLOR = 0xffffff;
const HIGHLIGHT_COLOR = 0xffff99;
const LINE_STYLE = {
   width: 2,
   cap: LINE_CAP.ROUND,
   join: LINE_JOIN.ROUND,
   alignment: 0.5,
};

type AnimateType = "animate" | "jump" | "no";

type VerticalAlignmentMode = "top" | "middle";

export abstract class AbstractTechTreeScene<T extends string, K extends string> extends Scene {
   private _viewport!: Viewport;
   private _selectedContainer: Container | undefined;
   private readonly _selectedGraphics = new SmoothGraphics();
   private _boxPositions: Partial<Record<T, Rectangle>> = {};
   private _selectedTech: T | undefined;
   private _layout: T[][] = [];

   protected abstract readonly config: ITechConfigWithAge<T, K>;
   protected abstract onSelected(k: T): void;
   protected abstract readonly verticalAlignment: VerticalAlignmentMode;

   override onLoad(): void {
      const { app } = this.context;

      forEach(this.config.definitions, (k, v) => {
         if (this._layout[v.column]) {
            this._layout[v.column].push(k);
         } else {
            this._layout[v.column] = [k];
         }
      });

      const width = this._layout.length * COLUMN_WIDTH;
      this._viewport = new Viewport({
         interaction: app.renderer.plugins.interaction,
         disableOnContextMenu: true,
         worldWidth: width,
         worldHeight: PAGE_HEIGHT,
         screenWidth: app.screen.width,
         screenHeight: app.screen.height,
      });

      app.renderer.backgroundColor = BG_COLOR;
      app.renderer.plugins.interaction.moveWhenInside = true;

      const preferredZoom = Math.max(app.screen.width / width, app.screen.height / PAGE_HEIGHT);
      this._viewport
         .drag()
         .wheel({ smooth: 10 })
         .clamp({
            direction: "all",
         })
         .clampZoom({
            maxScale: preferredZoom,
            minScale: preferredZoom / 5,
         });

      this._viewport.on("clicked", (e) => {
         const pos = e.world;
         forEach(this._boxPositions, (k, v) => {
            if (v?.contains(pos.x, pos.y)) {
               this.selectNode(k, "no");
               return true;
            }
            return false;
         });
      });

      app.stage.addChild(this._viewport);
      this.renderTechTree("no");
      this._viewport.setZoom(Math.max(app.screen.width / width, app.screen.height / PAGE_HEIGHT));
   }

   override onDestroy(): void {}

   public renderTechTree(cutTo: AnimateType): void {
      if (!this._viewport) {
         return;
      }
      this._viewport.removeChildren();
      const g = new SmoothGraphics();
      this._viewport.addChild(g).lineStyle(LINE_STYLE);
      this._viewport.addChild(this._selectedGraphics);
      this._boxPositions = {};
      this._layout.forEach((column, columnIdx) => {
         const height = (PAGE_HEIGHT - HEADER_TOTAL_HEIGHT) / column.length;
         column.forEach((item, rowIdx) => {
            const x = 50 + 500 * columnIdx;
            const y =
               height * rowIdx +
               HEADER_TOTAL_HEIGHT +
               (this.verticalAlignment === "top"
                  ? 0
                  : height / 2 - BOX_HEIGHT / 2 - (HEADER_TOTAL_HEIGHT - HEADER_BOX_HEIGHT) / 2);
            const rect = new Rectangle(x, y, BOX_WIDTH, BOX_HEIGHT);
            this._boxPositions[item] = rect;
            this._viewport.addChild(
               this.drawBox(
                  g,
                  rect,
                  this.config.definitions[item].name(),
                  this.config.unlocked[item] ? UNLOCKED_COLOR : LOCKED_COLOR
               )
            );
         });
      });

      forEach(this.config.ageDefinitions, (k, v) => {
         this._viewport.addChild(
            this.drawHeader(g, v.from, v.to, v.name(), isAgeUnlocked(k, this.config) ? UNLOCKED_COLOR : LOCKED_COLOR)
         );
      });

      forEach(this.config.unlockDefinitions, (to, v) => {
         v.forEach((from) => {
            this.drawConnection(
               g,
               this._boxPositions[from]!.x + BOX_WIDTH,
               this._boxPositions[from]!.y + BOX_HEIGHT / 2,
               this._boxPositions[to]!.x,
               this._boxPositions[to]!.y + BOX_HEIGHT / 2,
               // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
               this.config.unlocked[from] || this.config.unlocked[to] ? UNLOCKED_COLOR : LOCKED_COLOR
            );
         });
      });

      this._selectedContainer = this._viewport.addChild(new Container());
      this.selectNode(this._selectedTech, cutTo);
   }

   public selectNode(tech: T | undefined, cutToTech: AnimateType): void {
      this._selectedContainer!.removeChildren();
      this._selectedGraphics.clear();
      tech = tech ?? unlockableTechs(this.config)[0];
      if (!tech) {
         return;
      }
      this._selectedTech = tech;
      this._selectedGraphics.lineStyle(LINE_STYLE);
      let targets = [tech];
      const drawnBoxes: Partial<Record<T, true>> = {};
      const drawnConnections: Record<string, true> = {};
      while (targets.length > 0) {
         const newTo: T[] = [];
         targets.forEach((to) => {
            if (!drawnBoxes[to] && (!this.config.unlocked[to] || to === tech)) {
               this._selectedContainer!.addChild(
                  this.drawBox(
                     this._selectedGraphics,
                     this._boxPositions[to]!,
                     this.config.definitions[to].name(),
                     HIGHLIGHT_COLOR
                  )
               );
               drawnBoxes[to] = true;
            }
            this.config.unlockDefinitions[to].forEach((from) => {
               newTo.push(from);
               const key = `${from} -> ${to}`;
               // rome-ignore lint: bad suggestions
               if (!drawnConnections[key] && !this.config.unlocked[from] && !this.config.unlocked[to]) {
                  this.drawConnection(
                     this._selectedGraphics,
                     this._boxPositions[from]!.x + BOX_WIDTH,
                     this._boxPositions[from]!.y + BOX_HEIGHT / 2,
                     this._boxPositions[to]!.x,
                     this._boxPositions[to]!.y + BOX_HEIGHT / 2,
                     HIGHLIGHT_COLOR
                  );
                  drawnConnections[key] = true;
               }
            });
         });
         targets = newTo;
      }
      this.onSelected(tech);
      const targetX = this._boxPositions[tech]?.x ?? this._viewport.center.x;
      if (cutToTech === "animate") {
         new Tween(this).to({ scrollX: targetX }, 500).easing(Easing.Quadratic.InOut).start();
      } else if (cutToTech === "jump") {
         this.scrollX = targetX;
      }
   }

   private get scrollX(): number {
      return this._viewport.center.x;
   }

   private set scrollX(value: number) {
      this._viewport.moveCenter(value, this._viewport.center.y);
   }

   private drawConnection(
      g: SmoothGraphics,
      fromX: number,
      fromY: number,
      toX: number,
      toY: number,
      color: number
   ): void {
      g.moveTo(fromX, fromY);
      const oldColor = g.line.color;
      g.lineStyle({ ...g.line, color });
      g.bezierCurveTo((fromX + toX) / 2, fromY, (fromX + toX) / 2, toY, toX, toY);
      g.lineStyle({ ...g.line, color: oldColor });
   }

   private drawHeader(
      g: SmoothGraphics,
      startColumn: number,
      endColumn: number,
      text: string,
      color: number
   ): BitmapText {
      return this.drawBox(
         g,
         new Rectangle(
            50 + startColumn * COLUMN_WIDTH,
            (HEADER_TOTAL_HEIGHT - HEADER_BOX_HEIGHT) / 2,
            COLUMN_WIDTH * (endColumn - startColumn) + BOX_WIDTH,
            HEADER_BOX_HEIGHT
         ),
         text.toUpperCase(),
         color
      );
   }

   private drawBox(g: SmoothGraphics, rect: Rectangle, text: string, color: number, radius = 10): BitmapText {
      const oldColor = g.line.color;
      g.lineStyle({ ...g.line, color });
      g.drawRoundedRect(rect.x, rect.y, rect.width, rect.height, radius);
      g.lineStyle({ ...g.line, color: oldColor });
      const bitmapText = new BitmapText(text, {
         fontName: Fonts.MarcellusRegular,
         fontSize: 28,
         tint: color,
      });
      bitmapText.anchor.x = 0.5;
      bitmapText.anchor.y = 0.5;
      bitmapText.x = rect.x + rect.width / 2;
      bitmapText.y = rect.y + rect.height / 2;
      return bitmapText;
   }
}
