<template>
  <div class="w-60  bg-base-300 rounded-lg mt-1 mb-1">
    <div class="h-12 border-b border-b-base-content/10 items-center p-2 flex">
      <div class="ml-2 flex-1">私 信</div>
      <div class="mr-2 flex items-center opacity-40 text-xs">

      </div>
    </div>
    <div class="overflow-y-scroll h-[calc(100vh-var(--spacing)*12)]">
      <div class="rounded-sm m-1 flex p-2 hover:bg-base-100 transition cursor-default" v-for="item in 2">
        <div class="avatar avatar-placeholder mt-2 w-8 h-8 rounded-full m-1">
          <div class="bg-neutral ring-accent ring-2 text-neutral-content w-24 rounded-full">
            <!-- <span class="text-2xl">JU</span> -->
            <img src="https://pbs.twimg.com/profile_images/1770095002783535104/QNTnQj0B_400x400.jpg" alt="avatar">
          </div>
        </div>
        <div class="flex-1 p-1 min-w-0">
          <div class="flex items-center">
            <div class="font-bold flex-1 mr-1 truncate">Junhsiun</div>
            <div class="text-xs opacity-50">刚刚</div>
          </div>
          <div class="line-clamp-2 text-xs opacity-50">
            锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。锄禾日当午，汗滴禾下土。谁知盘中餐，粒粒皆辛苦。
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex-1 m-1 bg-base-300 rounded-lg flex flex-col">
    <div class="h-12 border-b border-b-base-content/10 flex items-center pl-3 pr-3">
      <div class="font-bold flex-1"><span class="status status-accent"></span> Junhsiun</div>
      <div class="menu menu-horizontal">
        <button class="btn btn-square btn-sm opacity-60">
          <Icon name="solar:monitor-bold-duotone" size="1.1rem"></Icon>
        </button>
        <button class="btn btn-square btn-sm opacity-60">
          <Icon name="solar:move-to-folder-bold-duotone" size="1.1rem"></Icon>
        </button>
        <button class="btn btn-square btn-sm opacity-60">
          <Icon name="solar:videocamera-record-bold-duotone" size="1.1rem"></Icon>
        </button>
        <button class="btn btn-square btn-sm opacity-60">
          <Icon name="solar:chat-square-call-bold-duotone" size="1.1rem"></Icon>
        </button>
        <button class="btn btn-square btn-sm opacity-60">
          <Icon name="solar:menu-dots-bold" size="1.1rem"></Icon>
        </button>
      </div>
    </div>


    <div class="p-3 flex-1">
      <div class="chat chat-start">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="avatar" src="https://pbs.twimg.com/profile_images/1770095002783535104/QNTnQj0B_400x400.jpg" />
          </div>
        </div>
        <div class="chat-header">
          Junhsiun
          <time class="text-xs opacity-50">4:26</time>
        </div>
        <div class="chat-bubble bg-base-100">Oi?</div>
        <div class="chat-footer opacity-50">送达</div>
      </div>
      <div class="chat chat-end">
        <div class="chat-image avatar">
          <div class="w-10 rounded-full">
            <img alt="avatar" src="https://pbs.twimg.com/profile_images/1770095002783535104/QNTnQj0B_400x400.jpg" />
          </div>
        </div>
        <div class="chat-header">
          Junhsiun too
          <time class="text-xs opacity-50">4:26</time>
        </div>
        <div class="chat-bubble bg-base-100">Oi!</div>

      </div>
    </div>
    <div class="m-2 bg-base-100 flex flex-col rounded-lg">
      <textarea class="w-full resize-none p-3 pb-1 outline-none text-sm" placeholder="输入消息..."></textarea>
      <div class="flex items-center">
        <div class="menu menu-horizontal gap-2 flex-1">
          <button class="btn btn-xs btn-square">
            <icon name="solar:add-square-bold-duotone" size="1.2rem"></icon>
          </button>
          <button class="btn btn-xs btn-square">
            <icon name="solar:paperclip-2-bold" size="1.2rem"></icon>
          </button>
          <button class="btn btn-xs btn-square">
            <icon name="solar:ghost-smile-bold-duotone" size="1.2rem"></icon>
          </button>
        </div>
        <button class="btn btn-xs mr-3 hover:text-primary">
          <Icon name="solar:plain-2-bold-duotone" size="1.2rem"></Icon>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  layout: 'app-main'
})
</script>
