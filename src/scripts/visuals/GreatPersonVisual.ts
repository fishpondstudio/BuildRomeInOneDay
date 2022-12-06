import { SmoothGraphics } from "@pixi/graphics-smooth";
import { BitmapText, Sprite, Text } from "pixi.js";
import { GreatPerson } from "../definitions/GreatPersonDefinitions";
import { Fonts } from "../generated/FontBundle";
import { Config } from "../logic/Constants";
import { containsNonASCII } from "../utilities/Helper";
import { ISceneContext } from "../utilities/SceneManager";

function makeText(text: string, size: number, tint: number) {
   if (containsNonASCII(text)) {
      return new Text(text, {
         fontFamily: "serif",
         fontSize: size,
         fill: tint,
      });
   }
   return new BitmapText(text, {
      fontName: Fonts.MarcellusRegular,
      fontSize: size,
      tint,
   });
}

function makeTextAutoSize(text: string, size: number, tint: number, maxWidth: number) {
   let i = 0;
   while (++i < 100) {
      const result = makeText(text, size, tint);
      if (result.width <= maxWidth) {
         return result;
      }
      size--;
   }
}

export function greatPersonSprite(greatPerson: GreatPerson, context: ISceneContext): Sprite {
   const { textures } = context;
   const { age, time, name } = Config.GreatPerson[greatPerson];

   const bg = new Sprite(textures.GreatPersonBackground);

   const ageText = bg.addChild(makeText(Config.TechAge[age].name().toUpperCase(), 30, 0x34495e));
   ageText.anchor.set(0.5, 0.5);
   ageText.alpha = 0.8;
   ageText.position.set(bg.width / 2, 40);

   const frame = bg.addChild(new Sprite(textures.GreatPersonFrame));
   frame.anchor.set(0.5, 0.5);
   frame.position.set(bg.width / 2, 250);

   const sprite = frame.addChild(new Sprite(textures[`Person${greatPerson}`]));
   const graphics = sprite.addChild(new SmoothGraphics());
   graphics.beginFill(0xffffff);
   graphics.drawCircle(0, 0, Math.min(sprite.width, sprite.height) / 2);
   graphics.endFill();
   sprite.anchor.set(0.5, 0.5);
   sprite.mask = graphics;
   sprite.scale.set(350 / Math.max(sprite.width, sprite.height));

   const nameText = bg.addChild(makeTextAutoSize(name().toUpperCase(), 50, 0x34495e, 400));

   nameText.anchor.set(0.5, 0.5);
   nameText.alpha = 0.8;
   nameText.position.set(bg.width / 2, 470);

   const timeText = bg.addChild(makeText(time, 25, 0x34495e));

   timeText.anchor.set(0.5, 0.5);
   timeText.alpha = 0.8;
   timeText.position.set(bg.width / 2, 540);

   return bg;
}

const greatPersonImageCache: Partial<Record<GreatPerson, string>> = {};

export function greatPersonImage(greatPerson: GreatPerson, context: ISceneContext): string {
   const cache = greatPersonImageCache[greatPerson];
   if (cache) {
      return cache;
   }
   const canvas = context.app.renderer.plugins.extract.canvas(
      greatPersonSprite(greatPerson, context)
   ) as HTMLCanvasElement;
   const dataURL = canvas.toDataURL();
   greatPersonImageCache[greatPerson] = dataURL;
   return dataURL;
}
