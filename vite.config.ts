import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import crypto from 'crypto'

// Polyfill for crypto.hash which is expected by Vite but not available in Node.js v20
if (!crypto.hash) {
  crypto.hash = function(algorithm, data) {
    // Return the hash as a hexadecimal string, which has substring method
    return crypto.createHash(algorithm).update(data).digest('hex')
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      react(),
      tailwindcss(),
  ],
})
