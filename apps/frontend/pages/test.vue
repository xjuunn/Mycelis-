<template>
  <button class="btn btn-primary" @click="test">test</button>
</template>

<script lang="ts" setup>
import {io} from 'socket.io-client';

const socket = io("ws://localhost:8081");
onMounted(() => {
  socket.on("connect", () => {
    console.log("connected");
  })
  socket.on("disconnect", () => {
    console.log("disconnected");
  })
  socket.on("message", (e) => {
    console.log(e, 0);
  })


})

function test() {
  socket.emit("message", {test: 1}, (e) => {
    console.log(e)
  });
}
</script>