<template>
    <div>
        <button class="btn btn-primary" @click="test">test</button>
    </div>
</template>

<script setup lang="ts">
import { list } from '~/api/user'
async function test() {
    let { data } = await list({}, { skip: 0, take: 15 })
    




}
</script>
