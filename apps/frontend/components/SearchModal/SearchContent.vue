<template>
    <div class="text-base-content/70 overflow-auto text-sm">
        <div v-show="isloading" class="text-center mt-10 mb-10">
            <div class="loading"></div>
        </div>
        <div v-show="isEmptyResult" class="text-center mt-10 mb-10">
            <span v-motion-slide-visible-bottom>
                无数据
            </span>
        </div>
        <div v-show="group.modalSearchItemList.length > 0 && isloading == false" v-for="group in listData"
            :key="group.groupName" class="mt-1 mb-1 relative">
            <div class="p-2 pl-4 sticky top-0 bg-base-300 z-20 font-bold">{{ group.groupName }}</div>
            <div v-for="item in group.modalSearchItemList" :key="item.text" @click="item.onClick"
                class="mt-1 ml-4 mr-4 border rounded-md p-2 border-base-content/0 hover:border-base-content/10 hover:bg-base-100/40 flex items-center gap-2"
                :class="{
                    'bg-base-100 border-base-content/30 hover:bg-base-content/10 hover:border-base-content/30': item.extra.index === selectIndex
                }">
                <icon v-if="item.imgOrIcon.type == 'icon'" :name="item.imgOrIcon.name"></icon>
                <div v-if="item.imgOrIcon.type == 'image'" class="avatar w-6 h-6 rounded-full overflow-hidden">
                    <img :src="File.getFileUrl(item.imgOrIcon.url)">
                </div>
                <div class="flex-1">
                    <span v-if="item.text">
                        {{ item.text }}
                        <span class="text-base-content/60 text-xs">
                            ({{ item.description }})
                        </span>
                    </span>
                    <span v-else>
                        {{ item.description }}
                    </span>
                </div>
                <component :is="item.extra.ui"></component>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { SearchUserHandler, type IModalHandlerResult } from '~/core/searchModal/ModalHandler';
import * as File from '~/api/file';
import { SearchTaskManager } from '~/core/searchModal/SearchTaskManager';
const listData: Ref<IModalHandlerResult[]> = ref([]);
const isloading = ref(false);
const isEmptyResult = ref(false)
const selectIndex = ref(-1);
onMounted(() => {
    useEmitt().emitter.on('search-modal-close', () => {
        isEmptyResult.value = false;
        isloading.value = false;
        listData.value = [];
    });

    onKeyStroke('Tab', (e) => {
        e.preventDefault()
        if (selectIndex.value >= listTotalNum.value - 1) return;
        selectIndex.value++;
    })
    onKeyStroke('ArrowUp', (e) => {
        e.preventDefault()
        if (selectIndex.value <= 0) return;
        selectIndex.value--;
    })
    onKeyStroke('ArrowDown', (e) => {
        e.preventDefault()
        if (selectIndex.value >= listTotalNum.value - 1) return;
        selectIndex.value++;
    })
    onKeyStroke('Enter', (e) => {
        e.preventDefault()
        const item = getSelectItem();
        item?.onClick()
    })
})
const mode = computed(() => {
    if (useSearchModal().text.value[0] === '/') return 'command';
    return 'default';
})
const listTotalNum = computed(() => {
    let total = 0;
    listData.value.forEach(group => {
        total += group.modalSearchItemList.length
    })
    return total;
})
function getSelectItem() {
    let tmp = selectIndex.value;
    for (let index = 0; index < listData.value.length; index++) {
        const group = listData.value[index];
        if (tmp < group.modalSearchItemList.length) {
            return group.modalSearchItemList[tmp];
        } else {
            tmp -= group.modalSearchItemList.length;
        }
    }
}
async function textChange(text: string) {
    if (mode.value === 'command') return;
    selectIndex.value = -1;
    isEmptyResult.value = false;
    if (!text) {
        listData.value = [];
        isloading.value = false;
        return
    };
    isloading.value = true;
    const searchTaskHandler = SearchTaskManager.getInstance();
    searchTaskHandler.registerHandler(new SearchUserHandler());
    let total = 0;
    searchTaskHandler.executeSearch(text, (data) => {
        listData.value = [];
        data.modalSearchItemList.forEach((item, index) => {
            item.extra.index = total + index;
        })
        total += data.modalSearchItemList.length
        listData.value.push(data);
        if (data.modalSearchItemList.length == 0) isEmptyResult.value = true;
    })
    isloading.value = false;
}

function loading() {
    isEmptyResult.value = false;
    isloading.value = true;
}

defineExpose({
    textChange,
    loading
})

</script>