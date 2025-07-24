<template>
    <div class="w-full overflow-scroll flex items-center justify-center flex-col p-2 gap-2">
        <div>
            <table v-show="!isloading">
                <tr v-for="tr in 7">
                    <td v-for="td in (totalBlockNum / 7) + 1">
                        <div ref="block" v-show="heatMapList[7 * (td - 1) + tr - 1]?.date !== undefined"
                            @click="selectBlock(7 * (td - 1) + tr - 1)"
                            class="w-[11px] h-[11px] m-[2px] hidden rounded-[3px] bg-success hover:scale-150 transition cursor-pointer"
                            :class="{
                                'opacity-5': heatMapList[7 * (td - 1) + tr - 1]?.level === 0,
                                'opacity-30': heatMapList[7 * (td - 1) + tr - 1]?.level === 1,
                                'opacity-70': heatMapList[7 * (td - 1) + tr - 1]?.level === 2,
                                'opacity-100': heatMapList[7 * (td - 1) + tr - 1]?.level === 3,
                                'sm:block': 7 * (td - 1) + tr - 1 > (colNum - 15) * 7 - 1,
                                'md:block': 7 * (td - 1) + tr - 1 > (colNum - 24) * 7 - 1,
                                'lg:block': 7 * (td - 1) + tr - 1 > (colNum - 40) * 7 - 1,
                                'xl:block': 7 * (td - 1) + tr - 1 > (colNum - 58) * 7 - 1,
                                '2xl:block': 7 * (td - 1) + tr - 1 > (colNum - 70) * 7 - 1,
                            }">
                            <!-- {{ 7 * (td - 1) + tr - 1 }} -->
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="float-right text-sm text-base-content/70 flex flex-row gap-3 justify-end">
            <div>
                {{ selectedItem?.date }}
            </div>
            <div>
                星期 {{ selectedItem?.week }}
            </div>
            <div>
                提交了 {{ selectedItem?.count }} 次
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from '@vueuse/core';
import { animate, stagger } from 'animejs';
import * as APP from '~/api/app';
const pointer = useBreakpoints(breakpointsTailwind);

const colNum = computed(() => {
    return 80
})
const totalBlockNum = computed(() => {
    return colNum.value * 7;
})
type HeatMapItem = {
    date: string,
    week: number,
    count: number,
    level: 0 | 1 | 2 | 3 | 4,
}
const blocks = useTemplateRef('block')
const heatMapList = ref<HeatMapItem[]>([]);
const isloading = ref(true);
onMounted(() => {
    initHeatMap();
    initData();

})
async function initData() {
    isloading.value = true;
    const { data } = await APP.Info.contributeHeatmap({ start: new Date(getFirstDay().date).toLocaleDateString() });
    const map = new Map<string, number>();
    data.data.forEach(date => {
        map.set(new Date(date.date).toLocaleDateString(), date.count);
    })
    let max = 0;
    heatMapList.value.forEach(date => {
        date.count = map.get(date.date) ?? 0;
        if (date.count > max) max = date.count
    })
    let unit = max / 4;
    heatMapList.value.forEach(date => {
        if (date.count === 0) {
            date.level = 0;
            return;
        }
        if (date.count <= unit) {
            date.level = 1;
            return;
        }
        if (date.count <= 2 * unit) {
            date.level = 2;
            return;
        }
        if (date.count <= 3 * unit) {
            date.level = 3;
            return;
        }
        date.level = 4;
    })
    isloading.value = false;
    selectedItem.value = heatMapList.value.slice(-1)[0];
    startAnimate();
}

function startAnimate(index: number = -1) {
    if (blocks.value)
        animate(blocks.value, {
            scale: [
                { to: [0, 1.25] },
                { to: 1 }
            ],
            boxShadow: [
                { to: '0 0 1rem 0 currentColor' },
                { to: '0 0 0rem 0 currentColor' }
            ],
            x: [
                { to: '5px' },
                { to: 0 }
            ],
            delay: stagger(100, {
                grid: [blocks.value.length / 7, 7],
                from: index == -1 ? 'last' : index
            }),
        });
}

function initHeatMap() {
    let firstDayInfo = getFirstDay();
    let firstDay = firstDayInfo.date;
    let today = new Date();
    for (let i = 0; i < totalBlockNum.value + firstDayInfo.offset; i++) {
        const thisday = new Date(firstDay + i * 1000 * 60 * 60 * 24);
        heatMapList.value.push({
            count: 0,
            level: 0,
            date: thisday.toLocaleDateString(),
            week: thisday.getDay() == 0 ? 7 : thisday.getDay()
        })
        if (thisday.toLocaleDateString() === today.toLocaleDateString()) break;
    }
}

function getFirstDay() {
    const today = Date.now();
    // 计算 {option.days} 天前的日期
    const targetDate = today - 1000 * 60 * 60 * 24 * totalBlockNum.value;
    // 计算目标周的周一
    const firstDate = targetDate - (new Date(targetDate).getDay() - 1) * 1000 * 60 * 60 * 24;
    return {
        date: firstDate,
        offset: new Date(targetDate).getDay()
    };
}
const selectedItem = ref<HeatMapItem>();
function selectBlock(index: number) {
    const cols = Math.ceil(totalBlockNum.value / 7) + 1;
    const tr = (index % 7) + 1;
    const td = Math.floor(index / 7) + 1;
    const blockIndex = (tr - 1) * cols + (td - 1);
    selectedItem.value = heatMapList.value[index];
    if (blocks.value) {
        animate(blocks.value, {
            scale: [
                { to: [1, 1.15] },
                { to: 1 }
            ],
            boxShadow: [
                { to: '0 0 1rem 0 currentColor' },
                { to: '0 0 0rem 0 currentColor' }
            ],
            x: [
                { to: '2px' },
                { to: 0 }
            ],
            delay: stagger(100, {
                grid: [blocks.value.length / 7, 7],
                from: blockIndex,
            }),
            duration: 700,
        });
    }
}
</script>