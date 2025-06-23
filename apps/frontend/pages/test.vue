<template>
  <div class="flex gap-2 flex-col h-screen">
    <button class="btn btn-primary" @click="test">test</button>

  </div>
</template>

<script setup>
const runtimeconfig = useRuntimeConfig();
import Peer from 'peerjs';
function test() {
  usePeer()
}
</script>