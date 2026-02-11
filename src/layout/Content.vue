<script setup lang="ts">
import { Spinner } from '@/components/ui/spinner'
import { useEmojiStore, useAppStore } from '@/store/index'
import { onMounted } from 'vue'

const emojiStore = useEmojiStore()
const appStore = useAppStore()

onMounted(() => {
    emojiStore.getEmojiData()
})

</script>

<template>
    <div class="overflow-hidden w-full flex-1 p-(--padding-l) box-border">
        <div class="h-full w-full flex justify-center items-center" v-if="emojiStore.loading">
            <Spinner class="size-6" />
            正在加载中
        </div>
        <div class="h-full w-full overflow-hidden" v-else asChild>
            <component :is="appStore.currentMenuComponent" />
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>
