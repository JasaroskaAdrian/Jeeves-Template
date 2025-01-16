import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  root: '.',
  optimizeDeps: {
    exclude: ['fsevents'], // Avoids macOS-specific optional dependency issues
  },
  server: {
    port: 4200, // Vite server for frontend
    host: '0.0.0.0', // Allows external access
    hmr: {
      protocol: 'ws', // WebSocket protocol for Hot Module Replacement (HMR)
      host: 'localhost',
      port: 24678, // HMR server port
      clientPort: 4200, // Frontend server port
    },
  },
  build: {
    sourcemap: true, // Useful for debugging in production builds
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './server/app/app.js', // Path to the Express server
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild', // TypeScript compiler (optional for JS)
    }),
  ],
});
