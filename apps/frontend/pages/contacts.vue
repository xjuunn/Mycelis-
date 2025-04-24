<template>
    <MainListContentLayout title="通讯录">
        <template #list>
            <ul class="menu w-full">
                <li>
                    <NuxtLink to="/contacts/search?ui=content">
                        <Icon name="iconamoon:search-duotone"></Icon> 搜索
                    </NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contacts/friends?ui=content">
                        <Icon name="solar:user-bold-duotone"></Icon> 好友
                    </NuxtLink>
                </li>
                <li>
                    <a>
                        <Icon name="solar:users-group-rounded-bold-duotone"></Icon> 群组
                    </a>
                </li>
            </ul>
        </template>
        <template #content>
            <NuxtPage></NuxtPage>
        </template>
    </MainListContentLayout>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "app-main",
});

</script>
