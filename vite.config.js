import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// Use createRequire to resolve through pnpm's symlinked node_modules
const require = createRequire(import.meta.url);

export default defineConfig({
  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium'),
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'node_modules/cesium/Build/Cesium/Workers', dest: 'cesium' },
        { src: 'node_modules/cesium/Build/Cesium/ThirdParty', dest: 'cesium' },
        { src: 'node_modules/cesium/Build/Cesium/Assets', dest: 'cesium' },
        { src: 'node_modules/cesium/Build/Cesium/Widgets', dest: 'cesium' },
      ],
    }),
  ],
  optimizeDeps: {
    exclude: ['cesium', '@cesium/engine'],
  },
  resolve: {
    alias: {
      // Resolve through pnpm's .pnpm store to the actual file on disk,
      // bypassing @zip.js/zip.js's broken package exports map.
      '@zip.js/zip.js/lib/zip-no-worker.js': require.resolve('@zip.js/zip.js/lib/zip-no-worker.js'),
    },
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
});
