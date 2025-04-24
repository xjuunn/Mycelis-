<template>
    <div class="h-full flex flex-col items-center p-2 lg:pt-10">
        <div class="max-w-[500px] w-full">
            <div v-for="(item, index) in listData" :key="item.id"
                class="min-h-16 bg-base-200 rounded-lg flex p-3 gap-2 mt-2 border border-base-content/0 hover:border-base-content/20">
                <div class="avatar h-10 rounded-full overflow-hidden">
                    <img :src="getFileUrl(item.friend.avatarUrl ?? '')" alt="tx">
                </div>
                <div class="h-fit flex flex-1">
                    <div class="flex-1">
                        <div class="font-bold">{{ item.friend.displayName ?? item.friend.name }}</div>
                        <div class="text-sm text-base-content/80">
                            {{ item.friend.name }}
                        </div>
                    </div>
                    <div class="mt-2 mr-1">
                        <div class="join">
                            <button class="btn join-item btn-primary btn-sm" @click="">聊天</button>
                            <button class="btn join-item btn-accent btn-sm" @click="">查看</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Friend from '~/api/friend';
import { getFileUrl } from '~/api/file';
import type { Types } from '@mycelis/database';
import type { PageRequest } from '@mycelis/types';
let listData: Ref<(Types.Friendship & { friend: Types.User, tag?: Types.FriendshipTag })[]> = ref([]);
let pageInfo: Ref<PageRequest> = ref({
    skip: 0,
    take: 15
})
let friendListForm: Ref<Friend.Friendship.ListForm> = ref({

})
onMounted(() => {
    initList();
})

async function initList() {
    let { data } = await Friend.Friendship.list(friendListForm.value, pageInfo.value);
    listData.value = data.data.list;

}

</script>
