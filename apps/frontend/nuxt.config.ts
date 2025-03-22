import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  nitro: {
    output: {
      dir: "dist",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {},
  },
  css: ["~/assets/app.css"],
  modules: [
    "@nuxt/icon",
    "@pinia/nuxt",
    "@formkit/auto-animate/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
  ],
});
