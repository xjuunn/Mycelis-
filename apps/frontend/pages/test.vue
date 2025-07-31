<template>
  <div class="h-full">
    <button class="btn btn-primary btn-sm" @click="test">test</button> &nbsp;
    <input class="input" v-model="cmd" type="text" placeholder="输入命令" />
  </div>
</template>

<script setup lang="ts">
import { CommandInputHelper } from '~/core/searchModal/command/CommandInputHelper';
import { CommandRegister } from '~/core/searchModal/command/CommandRegister';

definePageMeta({
  layout: 'app-main'
})

const cmd = ref('');
onMounted(() => {

})

async function test() {
  // const commandHelper = new CommandInputHelper();
  // const commands = commandHelper.searchCommand(commandHelper.extractCommandName(cmd.value));
  // const command = await commandHelper.getCommand(commands[0]);
  // command.setUserInput(cmd.value);
  // const result = await command.execute();
  // console.log(result);
}
</script>
