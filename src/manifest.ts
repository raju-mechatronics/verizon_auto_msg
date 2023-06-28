import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest(() => ({
  manifest_version: 3,
  name: "BUY SELL-TRADING VIEW",
  version: `0.0.1`,
  // background: {
  //   service_worker: "src/background/index.ts",
  //   type: "module",
  // },
  // action: {
  //   default_popup: "src/popup/popup.html",
  // },
  content_scripts: [
    {
      matches: ["https://www.tradingview.com/chart/*"],
      js: ["src/content/index.ts"],
    },
  ],
}));
