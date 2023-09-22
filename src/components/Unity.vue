<template>
  <div class="flex flex-col items-center justify-center h-full">
    <iframe
      id="webgl_iframe"
      frameborder="0"
      :src="url"
      @mousewheel=""
      class="w-full h-[700px] md:w-[1000px] md:h-[700px]"
    ></iframe>
    <div class="text-center mt-4">
      <h3 class="text-2xl font-semibold">{{ title }}</h3>
      <p class="text-sm md:text-base">{{ desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const url = ref("");
const title = ref("");
const desc = ref("");

const getDesc = () => {
  if (
    url.value ===
    "https://64e50a20839a9019d51bb911--delicate-belekoy-4e9031.netlify.app/"
  ) {
    title.value = "Balls of Steel";
    desc.value =
      "This game holds a profound attachment for me. It began as a playful prototype while I tested some Unity mechanics, and before long, I was fully immersed in it, consistently releasing updates. The game's growth took off when I shared it with friends, and their enjoyment, along with their suggestions for improvements, motivated me. One by one, I implemented their advice, enhancing the game with updates and new features. Soon after, a couple of musician friends were so impressed that they offered to create the game's music and sounds, and you can find their names in the game's credits within the menu.";
  }
  if (
    url.value ===
    "https://64e88ff4dd8a1c0a6a4fb402--wondrous-cajeta-945cf0.netlify.app/"
  ) {
    title.value = "Clicky Crate";
    desc.value =
      "While practicing scripts in the Junior Unity Programmer Pathway, I developed this game and felt it would be a missed opportunity not to preserve and utilize it.";
  }
};

onMounted(() => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  url.value = params.search;
  getDesc();
});
</script>
