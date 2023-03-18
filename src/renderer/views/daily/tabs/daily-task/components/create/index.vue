<!-- 创建日程 -->
<template>
    <div class="create-container">
        <el-input 
            v-model="formModel.title" 
            :rows="2"
            type="textarea" 
            placeholder="请输入任务名称，回车创建"
        ></el-input>
        <div class="flex items-center mt-8px tools">
            <div class="flex items-center mr-8px cursor-pointer">
                <i class="iconfont icon-24gf-tags2 mr-2px"></i>
                <span class="text-12px">标签</span>
            </div>
            <div class="flex items-center mr-8px cursor-pointer relative">
                <div @click="openDate">
                    <i class="iconfont icon-a-16Cjishishizhong mr-2px"></i>
                    <span class="text-12px">日期</span>
                </div>
                <el-date-picker
                    ref="datePickerRef"
                    v-model="formModel.planTime"
                    type="daterange"
                    format="YYYY-MM-DD"
                    value-format="YYYY-MM-DD"
                    size="small"
                >
                </el-date-picker>
            </div>
        </div>

    </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue';

const formModel = ref({
    title: '', // 标题
    tags: [], // 标签
    okr: [], // 所属OKR
    planTime: [], // 计划时间
    status: '', // 状态: todo doing done
});

const datePickerRef = ref();
function openDate() {
    datePickerRef.value?.handleOpen();
}

</script>
<style lang='scss' scoped>
.create-container {
    padding: 4px;
    background-color: #ffffff;
    .iconfont {
        color: var(--el-color-primary);
        font-size: 16px;
    }

    :deep(.el-textarea__inner) {
        box-shadow: none;
    }
    :deep(.el-date-editor) {
        visibility: hidden;
        position: absolute;
        width: 50px;
    }
}
</style>