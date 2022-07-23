<template>
  <div class="emoji-wrapper">
    <div class="emoji">
    <button
      class="emoji-item"
      v-for="(value, index) of emojiList"
      :key="index"
      @click="addEmoji(value.icon)"
    >
    {{value.icon}}
    </button>
    </div>
  </div>
</template>

<script>
import EmojiList from "@/assets/js/emoji";
export default {
  data: function() {
    return {
      emojiList: EmojiList
    };
  },
  methods: {
    addEmoji(key) {
      this.$emit("addEmoji", key);
    }
  }
};
</script>

<style scoped>
.emoji {
  display: flex;
  align-items: center;
  justify-items: center;
  z-index: 3;
  flex-flow: wrap;
}
.emoji-item {
  cursor: pointer;
  width: 14.2857%;
  height: 33px;
  background: #F5F6F7;
  border: 1px solid #fff;
  font-size: 19px;
  line-height: 33px;
  padding: 0;
}
.emoji-item:hover {
  transition: all 0.2s;
  border-radius: 0.25rem;
  background: #dddddd;
}
.emoji-wrapper {
  max-height: 150px;
  overflow-y: auto;
}
</style>
