import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
    // Exclude cesium and all its split sub-packages from Vite pre-bundling.
    // This prevents Vite from walking @cesium/engine's deps and hitting the
    // broken @zip.js/zip.js exports map (missing ./lib/zip-no-worker.js).
    exclude: ['cesium', '@cesium/engine'],
  },
  resolve: {
    // Bypass the broken @zip.js/zip.js package exports map by pointing the
    // missing subpath directly at the actual file on disk.
    alias: {
      '@zip.js/zip.js/lib/zip-no-worker.js':
        'node_modules/@zip.js/zip.js/lib/zip-no-worker.js',
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
