<template>
  <button class="btn btn-accent" @click="test">getAll</button>
</template>

<script lang="ts" setup>
import * as Message from '~/api/message'
async function test() {
  let { data } = await Message.send({
    receiverId: 22,
    message: "hello"
  });
  console.log(data);


}
</script>