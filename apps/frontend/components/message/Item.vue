<template>
    <div class="chat pl-2 pr-2" :class="{
        'chat-start transform-[translateX(-50px)] ': type === 'left',
        'chat-end transform-[translateX(50px)] ': type === 'right',
        'bg-base-100': isSelected
    }" ref="item" @dblclick="$emit('dbclick')" @click="$emit('click')" v-motion-fade-visible>
        <div class="chat-image avatar sticky bottom-0">
            <div class="w-9 rounded-full">
                <img alt="头像" :src="File.getFileUrl(user?.avatarUrl ?? '')" />
            </div>
        </div>
        <div class="chat-header">
            <span :class="type === 'right' ? 'order-2' : ''">{{ user?.displayName ?? user?.name }}</span>
            <time class="text-xs opacity-0" :class="{ 'opacity-50': isSelected || isLastItem }"> {{ createTime }}</time>
        </div>
        <div class="chat-bubble text-sm bg-base-100 wrap-break-word select-text" :class="{ 'bg-base-200': isSelected }"
            v-html="msg.message">
        </div>
        <div class="chat-footer opacity-0" :class="{
            'opacity-50': (isSelected && type == 'right') || (isLastItem && type == 'right'),
        }">{{
            msgStatus }}</div>
    </div>
</template>

<script lang="ts" setup>
import type { Model } from '@mycelis/types';
import * as File from '~/api/file';
import timeSince from '~/utils/time/timeSince';
const item = useTemplateRef('item');
const emits = defineEmits<{
    dbclick: void,
    click: void
}>()
const props = defineProps<{
    msg: Model.Message,
    user: Model.User | undefined,
    type: 'left' | 'right',
    isSelected?: boolean,
    isLastItem?: boolean
}>();
const createTime = computed(() => {
    if (Date.now() - new Date(props.msg.createAt).getTime() <= 36000000) return timeSince(props.msg.createAt);
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