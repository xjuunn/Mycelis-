<template>
  <div class="flex gap-2 flex-col h-screen">
    <button class="btn btn-primary" @click="test">test</button>
    <button class="btn btn-primary" @click="test2">test2</button>

  </div>
</template>

<script setup>

async function test() {
  useMediaStore().startUserMedia(true, true);
}
async function test2() {
  console.log(useMediaStore().userMedia.stream);

}
</script>