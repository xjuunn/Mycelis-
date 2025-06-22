import tailwindcss from "@tailwindcss/vite";
import { getConfig } from '@mycelis/config';
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: true,
  devServer: {
    port: Number(getConfig('WEB_PORT')),
  },
  builder: 'vite',
  typescript: {
    typeCheck: false,
    shim: false
  },
  routeRules: {
    '/': { prerender: true }
  },
  nitro: {
    output: {
      dir: "dist",
    },
  },
  icon: {
    size: '1.3rem',
    mode: 'css',
    cssLayer: 'base',
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ["@prisma/client"]
    },
    resolve: {
      alias: {
        ".prisma/client": "./node_modules/@prisma/client"
      }
    }
  },
  runtimeConfig: {
    jwt_secret: getConfig("JWT_SECRET"),
    public: {
      BASE_URL: `http://${getConfig('SERVER_HOST')}:${getConfig('SERVER_PORT')}`,
      APP_NAME: getConfig("APP_NAME"),
      APP_VERSION: getConfig("APP_VERSION"),
      WEB_PORT: getConfig("WEB_PORT"),
      FILE_UPLOAD_PATH: getConfig("FILE_UPLOAD_PATH"),
      SERVER_HOST: getConfig("SERVER_HOST"),
      SERVER_PORT: getConfig("SERVER_PORT"),
      PEER_SERVER_PORT: getConfig("PEER_SERVER_PORT")
    },
  },
  css: ["~/assets/app.css"],
  modules: [
    "@nuxt/icon",
    "@pinia/nuxt",
    "@formkit/auto-animate/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/device",
    '@vueuse/motion/nuxt'
  ],
});