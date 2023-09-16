<template>
  <Carousel
    :items-to-show="4"
    :itemsToScroll="2"
    :wrapAround="true"
    :autoplay="2000"
    :pauseAutoplayOnHover="true"
  >
    <Slide v-for="video in videos" :key="video.id">
      <div class="w-full flex flex-col">
        <div class="relative">
          <!-- Image Video -->
          <a
            :href="`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`"
          >
            <img :src="video.snippet.thumbnails.high.url" class="w-96 h-auto" />
          </a>

          <p
            class="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py"
          >
            1:15
          </p>
        </div>

        <div class="flex flex-row mt-2 gap-2">
          <!-- Profile Picture -->
          <a href="#">
            <img
              src="https://picsum.photos/seed/1/40/40"
              class="rounded-full max-h-10 max-w-10"
            />
          </a>

          <!-- Description -->
          <div class="flex flex-col">
            <a href="#">
              <p class="text-gray-100 text-sm font-semibold">
                Learn CSS Box Model in 8 Minutes
              </p>
            </a>
            <a class="text-gray-400 text-xs mt-2 hover:text-gray-100" href="#">
              Web Dev Simplified
            </a>
            <p class="text-gray-400 text-xs mt-1">241K views . 3 years ago</p>
          </div>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const props = defineProps({
  videos: {
    required: true,
  },
  channelInfo: {
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
