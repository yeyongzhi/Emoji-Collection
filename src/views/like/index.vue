<script setup lang="ts">
import { computed, ref } from 'vue'
import { useEmojiStore } from '@/store/emoji'
import { useAppStore } from '@/store/app'
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { FolderCode } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import EmojiItem from '@/views/components/EmojiItem.vue'

const appStore = useAppStore()
const emojiStore = useEmojiStore()

const likeItems = computed(() => emojiStore.getEmojiLike)

const likeData = computed(() => {
    let likeHexCodes = likeItems.value.map(item => item.hexcode)
    let list = emojiStore.emojiData.filter((item: any) => {
        return likeHexCodes.includes(item.hexcode)
    })
    if (searchWord.value && searchWord.value.length > 0) {
        list = list.filter((item: any) => {
            return (item.label && item.label.includes(search.value)) || (item.tags && item.tags.includes(search.value)) || (item.unicode && item.unicode.includes(search.value))
        })
    }
    return list
})

const search = ref('')

const clearSearch = () => {
    search.value = ''
}

const searchWord = computed(() => {
    return search.value.trim()
})

</script>

<template>
    <div class="w-full h-full">
        <Empty class="w-full h-full" v-if="likeItems.length === 0">
            <EmptyHeader>
                <EmptyMedia variant="icon">
                    <FolderCode />
                </EmptyMedia>
            </EmptyHeader>
            <EmptyTitle>暂无收藏💔</EmptyTitle>
            <EmptyDescription>有些常用的表情可以收藏一下在这里可以快速找到🚩</EmptyDescription>
            <EmptyContent>
                <Button class="cursor-pointer" @click="appStore.handleMenuSelect('base')">去看看</Button>
            </EmptyContent>
        </Empty>
        <template v-else>
            <div class="w-full flex justify-between items-center mb-(--margin-l)">
                <div class="flex items-center gap-(--margin-xs)">
                    <Input v-model="search" class="w-[400px]" placeholder="请输入关键字进行搜索" />
                    <Button class="cursor-pointer" variant="secondary" @click="clearSearch">
                        ❌️
                    </Button>
                </div>
                <div class="flex items-center gap-(--margin-l)">
                    <Label>共<span class="font-bold text-xl">{{ likeItems.length }}</span>个收藏</Label>
                    <Button class="cursor-pointer" variant="destructive" @click="emojiStore.clearEmojiLike">
                        一键清空收藏
                    </Button>
                </div>
            </div>
            <div class="w-full grid grid-cols-10 gap-(--margin-s)">
                <div v-for="emoji in likeData" :key="emoji.key">
                    <EmojiItem :data="emoji" :highlight="searchWord" />
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped lang="scss"></style>
