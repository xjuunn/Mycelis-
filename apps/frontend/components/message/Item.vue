<template>
    <div class="chat" :class="{
        'chat-start transform-[translateX(-50px)] ': type === 'left',
        'chat-end transform-[translateX(50px)] ': type === 'right',
    }" ref="item" v-motion-fade-visible-once>
        <div class="chat-image avatar sticky bottom-0">
            <div class="w-10 rounded-full">
                <img alt="头像" :src="File.getFileUrl(user?.avatarUrl ?? '')" />
            </div>
        </div>
        <div class="chat-header">
            <span :class="type === 'right' ? 'order-2' : ''">{{ user?.displayName ?? user?.name }}</span>
            <time class="text-xs opacity-50">{{ createTime }}</time>
        </div>
        <div class="chat-bubble bg-base-100" v-html="msg.message"></div>
        <div class="chat-footer opacity-50">{{ msgStatus }}</div>
    </div>
</template>

<script lang="ts" setup>
import type { Types } from '@mycelis/database';
import * as File from '~/api/file';
const item = useTemplateRef('item');
const props = defineProps<{
    msg: Types.Message,
    user: Types.User | undefined,
    type: 'left' | 'right'
}>();
const createTime = computed(() => {
    if (new Date().toLocaleDateString() === new Date(props.msg.createAt).toLocaleDateString())
        return new Date(props.msg.createAt).toLocaleTimeString();
    else return new Date(props.msg.createAt).toLocaleString();
})
const msgStatus = computed(() => {
    switch (props.msg.status) {
        case "Sent": return "已发送";
        case "Deleted": return "已删除";
        case "Delivered": return "送达";
        case "Failed": return "错误";
        case "Modified": return "已修改";
        case "Read": return "已读";
    }
})
</script>