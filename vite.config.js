const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const path = require("path");

// https://vitejs.dev/config/
module.exports = defineConfig(async ({ mode }) => {
  const plugins = [react()];
  
  // Only load componentTagger in development mode using dynamic import
  if (mode === "development") {
    try {
      const { componentTagger } = await import("lovable-tagger");
      plugins.push(componentTagger());
    } catch (error) {
      console.warn("Could not load lovable-tagger:", error.message);
    }
  }
  
  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: plugins.filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
