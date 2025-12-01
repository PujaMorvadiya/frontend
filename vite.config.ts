import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  server: {
    port: 3000,        // <-- specify your port here
    strictPort: true,  // optional: fail if port is already in use
    open: true,        // optional: automatically open in browser
  },
  resolve: {
    alias: {
      components: "/src/components",
      modules: "/src/modules",
      reduxStore: "/src/reduxStore",
      hooks: "/src/hooks",
      constant: "/src/constant",
      utils: "src/utils",
      configs: "/src/configs",
    },
  },
});
