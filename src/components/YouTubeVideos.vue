<template>
  <Carousel
    :items-to-show="3"
    :itemsToScroll="2"
    :wrapAround="true"
    :autoplay="2000"
    :pauseAutoplayOnHover="true"
  >
    <Slide
      v-for="video in videos"
      :key="video.id"
      class="relative z-10 hover:z-20"
    >
      <div class="flex flex-col items-center justify-center w-auto h-auto">
        <div class="">
          <!-- Image Video -->
          <a
            :href="`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`"
            target="_blank"
          >
            <div class="relative group hover:z-10">
              <img
                :src="video.snippet.thumbnails.high.url"
                class="w-full h-full transition-transform duration-300 transform rounded-lg shadow-lg shadow-terciary/20 group-hover:-translate-y-2"
              />
            </div>
          </a>

          <p
            class="absolute px-1 text-xs text-purple-700 bg-purple-200 right-2 bottom-2 py"
          >
            {{ convertISO8601ToTime(video.contentDetails.duration) }}
          </p>
        </div>

        <div class="flex flex-row gap-2 mt-2">
          <!-- Description -->
          <div class="flex flex-col items-center justify-center">
            <a
              :href="`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`"
              target="_blank"
            >
              <p
                class="items-center text-xs font-bold text-purple-800 sm:text-sm"
              >
                {{ video.snippet.title }}
              </p>
            </a>

            <p class="mt-1 text-xs text-gray-400">
              {{ video.statistics.viewCount }} Views -
              {{ timeSince(video.snippet.publishedAt) }}
            </p>
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

const timeSince = (dateString) => {
  const then = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - then) / 1000);
  let interval = Math.floor(seconds / 31536000); // seconds in a year

  if (interval >= 1) {
    return interval + (interval === 1 ? " year ago" : " years ago");
  }

  interval = Math.floor(seconds / 2592000); // seconds in a month
  if (interval >= 1) {
    return interval + (interval === 1 ? " month ago" : " months ago");
  }

  interval = Math.floor(seconds / 604800); // seconds in a week
  if (interval >= 1) {
    return interval + (interval === 1 ? " week ago" : " weeks ago");
  }

  interval = Math.floor(seconds / 86400); // seconds in a day
  if (interval >= 1) {
    return interval + (interval === 1 ? " day ago" : " days ago");
  }

  interval = Math.floor(seconds / 3600); // seconds in an hour
  if (interval >= 1) {
    return interval + (interval === 1 ? " hour ago" : " hours ago");
  }

  interval = Math.floor(seconds / 60); // seconds in a minute
  if (interval >= 1) {
    return interval + (interval === 1 ? " minute ago" : " minutes ago");
  }

  return Math.floor(seconds) + " seconds ago";
};
</script>

<style lang="scss" scoped></style>
