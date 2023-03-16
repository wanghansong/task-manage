<!-- iconfont多色图标 -->
<template>
    <svg class="iconfont" aria-hidden="true" :style="{ width: size + 'px', height: size + 'px' }">
        <use :xlink:href="'#'+icon"></use>
    </svg>
</template>

<script lang='ts' setup>
interface Props {
    icon: String,
    size?: Number,
}

const props = withDefaults(defineProps<Props>(), {
    size: () => 24
})

</script>
<style lang='less' scoped>
</style>