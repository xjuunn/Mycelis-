<template>
  <div class="flex gap-2">
    <input ref="inputEl" v-model="message" type="text" class="input input-bordered flex-1" />
    <button @click="sendMessage" class="btn btn-primary">
      发送
    </button>
  </div>
</template>

<script setup>
const inputEl = ref(null);
const message = ref('');
const sendMessage = () => {
  inputEl.value.focus();
};
</script>