import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

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
      utils: path.resolve(__dirname, "src/utils"),
      components: path.resolve(__dirname, "src/components"),
      modules: path.resolve(__dirname, "src/modules"),
      reduxStore: path.resolve(__dirname, "src/reduxStore"),
      hooks: path.resolve(__dirname, "src/hooks"),
      constant: path.resolve(__dirname, "src/constant"),
      config: path.resolve(__dirname, "src/config"),
    },
  },
});
