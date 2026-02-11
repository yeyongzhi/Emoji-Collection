<script setup lang="ts">
import { Switch } from '@/components/ui/switch'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAppStore } from '@/store/index'
import APP_MENU from '@/menu/index'

const appStore = useAppStore()

</script>

<template>
  <div
    class="border border-b w-full flex justify-between items-center h-[60px] p-(--padding-l) box-border">
    <div class="font-bold text-2xl">🔥Emoji 使用指南【看这就够了】</div>
    <div class="flex justify-center items-center gap-x-(--margin-xs)">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem v-for="menu in APP_MENU" :key="menu.key">
            <NavigationMenuLink as-child>
              <a class="cursor-pointer" @click="appStore.handleMenuSelect(menu.key)">{{ menu.name }}</a>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Switch v-model="appStore.isDark" />
          </TooltipTrigger>
          <TooltipContent>
            <p>切换主题</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
