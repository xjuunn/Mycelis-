<template>
  <div class="">
    <button class="btn btn-primary" @click="test">test</button>
    <Modal title="标题" :is-show="isShowModal" @on-backdrop-click="isShowModal = false">
      <template #content>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error, repellat rem! Esse ducimus enim officiis a
          rerum ullam placeat dolores repellendus sint facere consectetur, recusandae exercitationem autem corrupti.
          Numquam, sint?</p>
      </template>
      <template #action>
        <div class="join">
          <button @click="isShowModal = false" class="btn btn-sm join-item">取消</button>
          <button @click="isShowModal = false" class="btn btn-primary btn-sm join-item">确定</button>
        </div>
      </template>
    </Modal>


  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "app-main",
});
const isShowModal = ref(false);
function test() {
  isShowModal.value = true;
}
</script>
