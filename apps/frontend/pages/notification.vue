<template>
    <MainListContentLayout title="通知">
        <template #list>
            <ul class="menu w-full">
                <li>
                    <NuxtLink to="/notification?ui=content">
                        <Icon name="solar:notification-unread-bold-duotone"></Icon> 全部
                    </NuxtLink>
                </li>
                <li>
                    <a>
                        <Icon name="solar:user-plus-rounded-bold-duotone"></Icon> 好友申请
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
    layout: "app-main"
})

</script>