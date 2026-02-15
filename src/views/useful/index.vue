<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useEmojiStore } from '@/store/emoji'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription
} from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { ScrollArea } from '@/components/ui/scroll-area'
import EmojiItem from '@/views/components/EmojiItem.vue'

const emojiStore = useEmojiStore()

const AllDataSource = ref<any>([
    { name: '程序员常用Emoji', url: './coderEmoji.json', key: 'coder' },
    { name: '红书常用Emoji', url: './redbookEmoji.json', key: 'redbook' },
    { name: '社交媒体通用Emoji', url: './social.json', key: 'social' },
    { name: '电商 & 带货文案Emoji', url: './ecommerce.json', key: 'ecommerce' },
    { name: '学习 & 考研党 Emoji', url: './study.json', key: 'study' },
])

const data = ref<any>({})
const tabs = ref<any>({})
const tabKey = ref<any>({})

const getTabShowData = (key: string) => {
    if (!data.value[key]) {
        return []
    }
    let target = data.value[key].find((item: any) => {
        return tabKey.value[key] && item.key === tabKey.value[key]
    })
    if (!target) {
        return []
    }
    let list = target.data.map((item: any) => {
        let targetEmoji = emojiStore.emojiData.find((emoji: any) => emoji.hexcode === item.hexcode)
        if (targetEmoji) {
            return {
                ...item,
                ...targetEmoji
            }
        } else {
            return item
        }
    })
    return list
}

const loading = ref<boolean>(false)

const initData = () => {
    loading.value = true
    let promiseList: Array<Promise<any>> = AllDataSource.value.map((item: any) => {
        return fetch(item.url).then(res => res.json())
    })
    Promise.allSettled(promiseList).then((res: any) => {
        loading.value = false
        let valueList = res.filter((r: any) => {
            return r.status === 'fulfilled'
        }).map((item: any) => item.value)
        AllDataSource.value.forEach((item: any, index: number) => {
            let v = valueList[index]
            item.name = v.name
            data.value[item.key] = v.data
            tabs.value[item.key] = v.data.map((item: any) => {
                return {
                    key: item.key,
                    name: item.name
                }
            })
            if (tabs.value[item.key].length > 0) {
                tabKey.value[item.key] = tabs.value[item.key][0].key
            }
        })
    })
}

onMounted(() => {
    initData()
})

</script>

<template>
    <div class="w-full h-full flex flex-col gap-y-(--margin-l)">
        <div class="h-full w-full flex justify-center items-center" v-if="loading">
            <Spinner class="size-6 mr-(--margin-xs)" />
            正在加载中
        </div>
        <ScrollArea v-else class="w-full h-full">
            <Card v-for="(item, index) in AllDataSource" :key="item.key"
                :class="`${index === AllDataSource.length - 1 ? 'mt-0' : 'mb-(--margin-xl)'}`">
                <CardHeader>
                    <CardTitle class="app_page_title w-full font-bold text-xl">{{ item.name }}
                    </CardTitle>
                    <CardDescription>
                        <Tabs v-if="tabs[item.key] && tabs[item.key].length > 1" v-model="tabKey[item.key]" class="mt-(--margin-s)">
                            <TabsList>
                                <TabsTrigger :value="tab.key" v-for="tab in tabs[item.key]" :key="tab.key">
                                    {{ tab.name }}
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="w-full grid grid-cols-10 gap-(--margin-s)">
                        <div v-for="emoji in getTabShowData(item.key)" :key="emoji.key">
                            <EmojiItem :data="emoji" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ScrollArea>
    </div>
</template>

<style scoped lang="scss"></style>
