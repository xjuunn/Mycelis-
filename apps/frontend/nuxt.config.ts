import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  ssr: true,
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
    jwt_secret: process.env.JWT_SECRET,
    public: {
      BASE_URL: process.env.BASE_URL
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