import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const cesiumSource = 'node_modules/cesium/Build/Cesium';
const cesiumBaseUrl = 'cesiumStatic';

// Official CesiumGS Vite configuration — based on the cesium-vite-example repo.
// Replaces vite-plugin-cesium (third-party, unmaintained) with viteStaticCopy
// from the Vite ecosystem. This is what Cesium themselves recommend as of 2024.
export default defineConfig({
  define: {
    // Cesium needs to know the base URL to load workers, assets, and widgets at runtime.
    CESIUM_BASE_URL: JSON.stringify(`/${cesiumBaseUrl}`),
  },
  server: {
    port: 3000,
    // Allow all Vercel preview hosts (fixes "Blocked request" error for *.vercel.run)
    allowedHosts: 'all',
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: `${cesiumSource}/ThirdParty`, dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Workers`,    dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Assets`,     dest: cesiumBaseUrl },
        { src: `${cesiumSource}/Widgets`,    dest: cesiumBaseUrl },
      ],
    }),
  ],
  optimizeDeps: {
    // Cesium is a massive ESM library — pre-bundling it causes Vite to OOM.
    // Exclude it so Vite serves it from node_modules directly.
    exclude: ['cesium'],
  },
  build: {
    // Cesium is too large for Rollup's default 500kb chunk warning
    chunkSizeWarningLimit: 4096,
    rollupOptions: {
      output: {
        // Put all Cesium code into a dedicated chunk — keeps app bundle lean
        manualChunks: {
          cesium: ['cesium'],
        },
      },
    },
  },
});
