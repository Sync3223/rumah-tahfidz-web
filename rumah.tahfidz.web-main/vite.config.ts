import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins:
    [
      tailwindcss(),
      react()
    ],
  // server: {
  //   host: '0.0.0.0', // Exposes the server to the outside network
  //   port: Number(process.env.PORT) || 8080,
  // },
  // preview: {
  //   host: '0.0.0.0',
  //   port: Number(process.env.PORT) || 8080,
  //   allowedHosts: true, // Prevents DNS rebinding errors in production
  // }
})
