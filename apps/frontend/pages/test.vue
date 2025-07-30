<template>
  <div class="h-full">
    <button class="btn btn-primary btn-sm" @click="test">test</button> &nbsp;
    <input class="input" v-model="cmd" type="text" placeholder="输入命令" />
  </div>
</template>

<script setup lang="ts">
import { CommandRegister } from '~/core/searchModal/command/CommandRegister';

definePageMeta({
  layout: 'app-main'
})

const cmd = ref('');
onMounted(() => {

})

async function test() {
  const commandRegister = CommandRegister.getInstance();
  const callCommand = await commandRegister.getCommand('call');
  callCommand.setUserInput(cmd.value);
  console.log(callCommand);
  const result = await callCommand.execute();
  console.log(result);
}
</script>
