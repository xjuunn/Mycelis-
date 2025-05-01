<template>
  <button class="btn btn-accent" @click="test">getAll</button>
</template>

<script lang="ts" setup>

let { socket } = useSocket()
function test() {
  console.log(socket);

}
</script>