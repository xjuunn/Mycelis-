<template>
  <div class="h-full">
    <ClientOnly>
      <BaseLayoutLR title="消 息">
        <template #title-right>
          <NuxtLink to="/search?ui=content" class="btn btn-sm btn-ghost opacity-60 hover:opacity-100">
            <Icon name="mingcute:add-line"></Icon>
          </NuxtLink>
        </template>
        <template #list>
          <div role="tablist" class="tabs tabs-border">
            <a role="tab" class="transition tab tab-active">全部</a>
            <a role="tab" class="transition tab">重要消息</a>
            <a role="tab" class="transition tab">私信</a>
          </div>
          <div class="overflow-y-scroll">
            <MessageUserList></MessageUserList>
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

</script>
