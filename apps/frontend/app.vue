<template>
  <div class="font-mono select-none h-[100dvh] bg-base-300 text-base-content/90">
    <div id="appTop"></div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div class="toast" id="ToastContainer"></div>
    <div class="toast h-0 z-[-1] overflow-hidden">
      <div class="alert alert-error"></div>
      <div class="alert alert-info"></div>
      <div class="alert alert-success"></div>
      <div class="alert alert-warning"></div>
    </div>
    <div id="appBottom"></div>
  </div>
</template>
<script lang="ts" setup>
useHead({
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/icon-light-64.png",
    },
  ],
});
onMounted(() => {
  useTheme().init();
  useLogger().showHello();
  document
    .getElementsByTagName("body")[0]
    .addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  if (import.meta.client) {
    // 初始化 Socket 客户端
    useSocket()?.init();
    // 初始化 Peer 客户端
    usePeer();
    // 检查客户端状态
    useCheck().check();
  }
});
</script>
<style lang="css">
* {
  scrollbar-width: none;
}

.glass {
  background-image: none;
  box-shadow: none;
}
</style>
