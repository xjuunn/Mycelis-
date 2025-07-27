<template>
    <div class="text-base-content/70 text-sm p-1 pl-2 pr-2">
        <div v-for="item in 6"
            class="p-1 mb-1 border border-transparent hover:border-base-content/10 rounded-md hover:bg-base-100/60">{{
                item }}</div>
    </div>
</template>

<script setup lang="ts">
import { SearchUserHandler, type IModalHandlerResult } from '~/core/searchModal/ModalHandler';

const listData: Ref<IModalHandlerResult[]> = ref([]);
async function textChange(text: string) {
    const searchUserHandler = new SearchUserHandler();
    const data = await searchUserHandler.doSearch(text);
    listData.value.push(data);
    console.log(listData.value);

}

defineExpose({
    textChange,
})

</script>