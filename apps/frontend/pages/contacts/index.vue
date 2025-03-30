<template>
    <MainListMain :title="'通讯录'">
        <template #list>
            <ul class="menu w-full">
                <li>
                    <a  @click="content = markRaw(ContactsSearch)">
                        <Icon name="solar:magnifer-bold-duotone" size="1.1rem"></Icon>搜索
                    </a>
                </li>
                <li>
                    <a @click="content = markRaw(ContactsFriendRequest)">
                        <Icon name="solar:letter-bold-duotone" size="1.1rem"></Icon>好友申请
                    </a>
                </li>
                <li>
                    <a @click="content = markRaw(ContactsFriendList)">
                        <Icon name="solar:user-bold-duotone" size="1.1rem"></Icon>好友列表
                    </a>
                </li>
                <li>
                    <a @click="content = markRaw(ContactsGroup)">
                        <Icon name="solar:users-group-two-rounded-bold-duotone" size="1.1rem"></Icon>群组
                    </a>
                </li>
                <li>
                    <a @click="content = markRaw(ContactsTags)">
                        <Icon name="solar:hashtag-square-bold-duotone" size="1.1rem"></Icon>标签
                    </a>
                </li>
            </ul>
        </template>
        <template #main>
            <div class="h-full flex min-h-0 justify-center">
                <div class="w-full h-full max-w-[400px] p-5">
                    <component :is="content"></component>
                </div>
            </div>
        </template>

    </MainListMain>
</template>

<script setup lang="ts">
import ContactsSearch from '~/components/contacts/Search.vue';
import ContactsFriendRequest  from '~/components/contacts/FriendRequest.vue';
import ContactsFriendList  from '~/components/contacts/FriendList.vue';
import ContactsGroup from '~/components/contacts/Group.vue';
import ContactsTags from '~/components/contacts/Tags.vue';
definePageMeta({
    layout: "app-main"
})
let content = ref(markRaw(ContactsSearch))

</script>
