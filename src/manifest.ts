import { defineManifest } from "@crxjs/vite-plugin";

export default defineManifest((_env) => ({
  manifest_version: 3,
  name: "BSIC EXTENSION",
  version: `0.0.1`,
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },
  action: {
    default_popup: "src/popup/popup.html",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.ts"],
    },
  ],
  permissions: ["tabs", "storage"],
}));
