import { defineConfig } from "vite";
import Spritesmith from "vite-plugin-spritesmith";
import { swcReactRefresh } from "vite-plugin-swc-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [
      swcReactRefresh(),
      Spritesmith({
         watch: true,
         src: {
            cwd: "./src/textures",
            glob: "**/*.png",
         },
         target: {
            image: "./src/images/textures.png",
            css: [["./src/images/textures.json", { format: "json_texture" }]],
         },
         spritesmithOptions: {
            padding: 1,
         },
      }),
   ],
   server: {
      port: 3000,
      host: true,
   },
   optimizeDeps: {
      disabled: false,
   },
});
