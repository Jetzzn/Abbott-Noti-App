import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt", // เปลี่ยนจาก autoUpdate เป็น prompt
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        cleanupOutdatedCaches: true, // เปลี่ยนเป็น true
        sourcemap: true,
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
