<template>
  <div class="font-mono select-none h-[100dvh]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <div class="toast" id="ToastContainer">
    </div>
    <div class="toast h-0 z-[-1] overflow-hidden">
      <div class="alert alert-error"></div>
      <div class="alert alert-info"></div>
      <div class="alert alert-success"></div>
      <div class="alert alert-warning"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/icon-light-64.png'
    }
  ]
})

// TODO 暂时禁用初始化
// 初始化 Socket 客户端
// useSocket();
// 检查客户端状态
// useCheck().check();
onMounted(() => {
  document.getElementsByTagName('body')[0].addEventListener('contextmenu', (e) => {
    e.preventDefault();
  })
})
</script>
<style lang="css">
* {
  scrollbar-width: none;
}
</style>
