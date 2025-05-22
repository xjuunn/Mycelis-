<template>
  <div class="flex gap-2 items-center justify-center h-screen">
    <button class="btn btn-primary" @click="test">test</button>
  </div>
</template>

<script setup>
function test() {
  console.log("test");
  
}
</script>