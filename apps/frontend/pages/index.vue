<template>
  <div class="h-full">
    <ClientOnly>
      <BaseLayoutLR title="消 息">
        <template #title-right>
          <NuxtLink to="/search?ui=content" class="btn btn-sm btn-ghost opacity-60 hover:opacity-100">
            <Icon name="mingcute:search-2-line"></Icon>
          </NuxtLink>
        </template>
        <template #list>
          <div role="tablist" class="tabs tabs-border">
            <a role="tab" class="transition tab tab-active">全部</a>
            <a role="tab" class="transition tab">重要消息</a>
            <a role="tab" class="transition tab">私信</a>
          </div>
          <div class="overflow-y-scroll">
            <div class="min-h-16 flex p-2.5 hover:bg-base-200 transition">
              <div class="avatar ring-2 ring-primary w-10 h-10 rounded-full overflow-hidden m-1">
                <img :src="Files.getFileUrl(useAppStore().user?.avatarUrl ?? '')" alt="tx" />
              </div>
              <div class="ml-3 flex-1">
                <div class="text-md flex w-full items-center">
                  <div class="font-bold flex-1 line-clamp-1">
                    {{ useAppStore().user?.displayName ?? useAppStore().user?.name }}
                  </div>
                  <div class="text-xs opacity-40">刚刚</div>
                </div>
                <div class="flex mt-1">
                  <div class="flex-1 text-xs opacity-60 line-clamp-1">你好</div>
                  <div class="badge badge-xs badge-primary">1</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #content>
          <NuxtPage></NuxtPage>
        </template>
      </BaseLayoutLR>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ layout: "app-main", });
import * as Files from "~/api/file";
</script>
