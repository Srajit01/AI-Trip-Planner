import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite" 


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      include: ['@google/generative-ai'],
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
