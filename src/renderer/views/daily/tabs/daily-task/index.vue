<!-- 每日任务 -->
<template>
    <div class="flex w-full daily-task">
        <div class="daily-task__left">
            <div class="mb-12px daily-task__left__header">
                <div class="flex items-center cursor-pointer" @click="openDatePicker">
                    <span class="text-28px font-bold mr-8px">{{ showDate }}</span>
                    <span class="text-28px font-bold mr-6px">{{ currentWeekday }}</span>
                    <i class="iconfont icon-xiajiantou"></i>
                </div>
                <el-date-picker
                    ref="datePickerRef"
                    v-model="currentDate"
                    type="date"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    size="small"
                    :shortcuts="singleDateShortcuts"
                >
                </el-date-picker>
            </div>
            <Create />
        </div>
        <div class="daily-task__right">
        222
        </div>
    </div>
</template>

<script lang='ts' setup>
import { computed, ref } from 'vue';
import { format } from 'fecha';
import { weekdayMap, singleDateShortcuts } from './const';
import Create from './components/create/index.vue';

const currentDate = ref(new Date());
const showDate = computed(() => {
    return format(new Date(currentDate.value), 'MM月DD日');
});
const currentWeekday = computed(() => {
    const weekNum = format(new Date(currentDate.value), 'd');
    return weekdayMap[weekNum];
});

const datePickerRef = ref();
function openDatePicker() {
    datePickerRef.value?.handleOpen();
}




</script>
<style lang='scss' scoped>
.daily-task {
    position: relative;
    &__left {
        width: 50%;
        padding-right: 10px;
        &__header {
            :deep(.el-date-editor) {
                visibility: hidden;
                position: absolute;
                top: 4px;
            }
        }
        
    }
    &__right {
        width: 50%;
        padding-left: 10px;
    }
}
</style>