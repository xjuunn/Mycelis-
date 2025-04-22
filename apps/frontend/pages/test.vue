<template>
    <button class="btn btn-primary" @click="test">test</button>
</template>

<script lang="ts" setup>
function test() {
    useToast().success('test')
    useToast().error('test')
    useToast().warning('test')
    useToast().info('test')


}
</script>