<template>
  <div ref="container" class="h-[100dvh] relative flex flex-col bg-base-200 overflow-hidden border-2 border-red-600">
    <div ref="scrollbox" class="overflow-y-auto pb-32">
      <button @click="openkeyboard" class="btn btn-primary">open</button>
      <button @click="closeKeyboard" class="btn btn-primary">close</button>
      <div v-for="item in 40">
        {{ item }}: {{ num }}
      </div>
    </div>
    <div class="p-2 w-full border-t bg-base-100 absolute bottom-0">
      <input ref="inputRef" type="text" class="input input-bordered w-full" placeholder="请输入内容" @focus="onfocus"
        @focusout="onfocus" />
    </div>
  </div>
</template>
<script lang="ts" setup>
let container = useTemplateRef('container');
let inputRef = useTemplateRef("inputRef");
let scrollbox = useTemplateRef('scrollbox');

function onfocus() {
  console.log("focus:", window.visualViewport?.height ?? 0)
  setTimeout(() => {
    document.getElementById('appBottom')?.scrollIntoView()
  }, 100)
}
let originalHeight = 0;

function onResize() {
  const currentHeight = window.innerHeight
  if (currentHeight >= originalHeight) {
    // 键盘已关闭
    console.log('Keyboard hidden')
    onfocus()
  } else {
    // 键盘弹出中
    console.log('Keyboard visible')
  }
}

onMounted(() => {
  originalHeight = window.innerHeight;
  originalHeight = window.innerHeight
  window.addEventListener('resize', onResize)
  if (scrollbox.value) {
    scrollbox.value.addEventListener('scroll', onScroll)
  }
})
let num = ref(-1);
function onScroll() {
  num.value++;
  closeKeyboard()
  console.log("scroll");

}

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize)
  if (scrollbox.value) {
    scrollbox.value.removeEventListener('scroll', onScroll)
  }
})

function openkeyboard() {
  inputRef.value?.focus();
}
function closeKeyboard() {
  console.log('close');
  if (document.activeElement)
    (document.activeElement as HTMLElement)?.blur()
}
</script>