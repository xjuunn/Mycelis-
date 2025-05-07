<template>
  <div class="">
    <!-- <button class="btn btn-primary" @click="test">test</button> -->
    test
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "app-main",
});
function test() {
  console.log("test");
}
</script>
