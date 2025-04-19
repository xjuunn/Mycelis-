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
import { breakpointsTailwind } from '@vueuse/core';
definePageMeta({
  layout: "app-main"
})
</script>
