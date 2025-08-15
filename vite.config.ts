import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
// import basicSsl from '@vitejs/plugin-basic-ssl'; // Comment out for now

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    https: process.env.HTTPS === 'true' ? {
      // For development SSL - Vite will generate self-signed certificates
      // No additional plugins needed!
    } : false,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    // process.env.HTTPS === 'true' && basicSsl(), // Comment out SSL plugin for now
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
