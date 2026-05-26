import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite' // <-- You need this line!

export default defineConfig({
  base: '/', // <-- Change this to '/' for Vercel
  plugins: [
    tanstackStart(),
  ],
})
