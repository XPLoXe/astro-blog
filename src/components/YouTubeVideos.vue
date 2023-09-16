<template>
  <Carousel
    :items-to-show="4"
    :itemsToScroll="2"
    :wrapAround="true"
    :autoplay="2000"
    :pauseAutoplayOnHover="true"
  >
    <Slide v-for="video in videos" :key="video.id">
      <div class="w-full h-auto flex flex-col items-center justify-center">
        <div class="">
          <!-- Image Video -->
          <a
            :href="`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`"
          >
            <img :src="video.snippet.thumbnails.high.url" class="w-96 h-auto" />
          </a>

          <p
            class="absolute right-2 bottom-2 bg-gray-900 text-gray-100 text-xs px-1 py"
          >
            {{ convertISO8601ToTime(video.contentDetails.duration) }}
          </p>
        </div>

        <div class="flex flex-row mt-2 gap-2">
          <!-- Profile Picture -->
          <a href="#">
            <img
              :src="channelInfo.snippet.thumbnails.default.url"
              class="rounded-full max-h-10 max-w-10"
            />
          </a>

          <!-- Description -->
          <div class="flex flex-col items-center justify-center">
            <a href="#">
              <p class="text-purple-800 text-sm font-bold items-center">
                {{ video.snippet.title }}
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

const convertISO8601ToTime = (duration) => {
  {
    const regex = /P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = duration.match(regex);

    const days = parseInt(matches[1], 10) || 0;
    const hours = days * 24 + (parseInt(matches[2], 10) || 0);
    const minutes = parseInt(matches[3], 10) || 0;
    const seconds = parseInt(matches[4], 10) || 0;

    let result = [];
    if (hours > 0) {
      result.push(hours);
    }

    // Always show minutes, even if it's 0, but only if there are hours
    if (hours > 0 || minutes > 0) {
      result.push(String(minutes).padStart(2, "0"));
    } else {
      result.push("0");
    }

    result.push(String(seconds).padStart(2, "0"));

    return result.join(":");
  }
};
</script>

<style lang="scss" scoped></style>
