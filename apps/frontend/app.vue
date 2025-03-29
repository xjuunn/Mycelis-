<template>
  <div class="font-mono select-none">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
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
