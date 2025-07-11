<template>
    <modal title="来电" :is-show="isShow" @on-backdrop-click="onBackDropClick">
        <template #content>
            接通电话
        </template>
        <template #action>
            <div class="join">
                <button class="btn btn-sm btn-ghost join-item">挂断</button>
                <button class="btn btn-sm btn-success join-item">接通</button>
            </div>
        </template>
    </modal>
</template>

<script setup lang="ts">
const isShow = ref(false);
function onBackDropClick() {
    isShow.value = false;
}

</script>