<template>
  <div class="flex flex-row flex-auto py-4 text-lg">
    <i class="fa-solid fa-quote-left fa-sm flex-auto" />
    <p class="text-center">{{ quote }}</p>
    <i class="fa-solid fa-quote-right fa-sm flex-auto" />
  </div>
  <div>
    <i class="text-xs">{{ author }}</i>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

const quote = ref("");
const author = ref("");

const getRandomQuote = async () => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    quote.value = response.data.content;
    author.value = response.data.author;
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

onMounted(getRandomQuote());
</script>
