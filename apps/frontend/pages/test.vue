<template>
  <button class="btn btn-primary" @click="test">test</button>
  <button class="btn btn-accent" @click="getAll">getAll</button>
</template>

<script lang="ts" setup>
import {io} from 'socket.io-client';

const socket = io("ws://192.168.180.133:8080", {
  extraHeaders: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsIm5hbWUiOiJhZG1pbiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc0NTc1NzkxMn0.vievsWRdA_VQVFaRZvktvgOnEiwu6Nj1Q6xNmVVJ2hQ'
  }
});
onMounted(() => {
  socket.on("connect", () => {
    console.log("connected");
  })
  socket.on("disconnect", () => {
    console.log("disconnected");
  })
  socket.on("client/Connect", (e) => {
    console.log(e, 0);
  })
  socket.on("client/getAll", (e) => {
    console.log(e, 0);
  })
})

function test() {
  socket.emit("client/Connect", {name: Math.random() + "", os: "Windows"}, (e: any) => {
    console.log(e)
  });
}

function getAll() {
  socket.emit("client/getAll", {name: Math.random() + "", os: "Windows"}, (e: any) => {
    console.log(e)
  });
}
</script>