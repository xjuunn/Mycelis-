<template>
  <div class="h-full">
    <button class="btn btn-primary btn-sm" @click="test">test</button>
  </div>
</template>

<script setup lang="ts">
import { CommandRegister } from '~/core/searchModal/command/CommandRegister';

definePageMeta({
  layout: 'app-main'
})
async function test() {
  const commandRegister = CommandRegister.getInstance();
  console.log(await commandRegister.getCommand('call'));
  console.log(commandRegister);


}
</script>
