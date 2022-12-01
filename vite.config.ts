import { defineConfig } from "vite";
import Spritesmith from "vite-plugin-spritesmith";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { swcReactRefresh } from "vite-plugin-swc-react-refresh";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
   return {
      plugins: [
         swcReactRefresh(),
         Spritesmith({
            watch: command === "serve",
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
         viteStaticCopy({
            targets: [{ src: "src/fonts/*.png", dest: "assets" }],
         }),
      ],
      server: {
         port: 3000,
         host: true,
      },
      optimizeDeps: {
         disabled: false,
      },
      esbuild: { jsx: "automatic" },
   };
});
