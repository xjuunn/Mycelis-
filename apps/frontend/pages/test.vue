<template>
  <div class="flex gap-2 flex-col h-screen">
    <button class="btn btn-primary" @click="test">test</button>

  </div>
</template>

<script setup>
import { test as SendTempMessage, getUserInfo } from '~/api/message/tempMessage';
async function test() {
  getUserInfo(22, info => {
    console.log('getUserInfo', info);
  })

}
</script>