<template>
  <div class="flex gap-2 flex-col h-screen">
    <button class="btn btn-primary" @click="test">test</button>
    <DevLogList></DevLogList>
  </div>
</template>

<script setup>
const { log, logDefault, logError, logSuccess, loggerList } = useLogger();
function test() {
  logDefault('default', true, false)
  logError('error');
  logSuccess('success', true, true);
  const { builder } = useConsoleLog();
  builder.error('testerror', false, true).addBackground('primary')
    .success(':success').default(':default');
  log(builder.build());


}
</script>