<template>
  <div class="flex gap-2 flex-col h-screen">
    <button class="btn btn-primary" @click="test">test</button>

  </div>
</template>

<script setup>
const runtimeconfig = useRuntimeConfig();
import Peer from 'peerjs';
function test() {
  const peer = new Peer({
    host: "127.0.0.1",
    port: runtimeconfig.public.PEER_SERVER_PORT ?? 9000,
    path: '/peerjs'
  })
  peer.on('open', (id) => {
    console.log(id);
  })
  peer.on('error', (error) => {
    console.log(error);
  })
}
</script>