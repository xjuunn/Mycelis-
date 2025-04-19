<template>
  <MainListContentLayout title="消息">
    <template #list>
      <MainMessageList></MainMessageList>
    </template>
    <template #content>
      test
    </template>
  </MainListContentLayout>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "app-main"
})
</script>
