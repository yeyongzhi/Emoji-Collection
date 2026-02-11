import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchEmojis, fetchShortcodes, fetchMessages } from "emojibase";

export const useEmojiStore = defineStore("emoji", () => {
  const loading = ref(false);
  const emojiData = ref<any>([]);
  const emojiGroupData = ref<any>([]);

  const getEmojiData = async () => {
    loading.value = true;
    const zhEmojis = await fetchEmojis("zh", { compact: true });
    // const shortcodes = await fetchShortcodes("zh", 'cldr');
    const messages = await fetchMessages("zh");
    emojiData.value = zhEmojis;
    emojiGroupData.value = messages.groups;
    loading.value = false;
  };

  return {
    emojiData,
    emojiGroupData,
    getEmojiData,
    loading,
  };
});
