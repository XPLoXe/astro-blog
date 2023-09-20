<template>
  <Carousel
    :items-to-show="4"
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
      <div class="w-auto h-auto flex flex-col items-center justify-center">
        <div class="">
          <!-- Image Video -->
          <a
            :href="`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`"
            target="_blank"
          >
            <div class="relative group hover:z-10">
              <img
                :src="video.snippet.thumbnails.high.url"
                class="w-full h-full transform transition-transform duration-300 group-hover:scale-150"
              />
            </div>
          </a>

          <p
            class="absolute right-2 bottom-2 bg-purple-200 text-purple-700 text-xs px-1 py"
          >
            {{ convertISO8601ToTime(video.contentDetails.duration) }}
          </p>
        </div>

        <div class="flex flex-row mt-2 gap-2">
          <!-- Profile Picture -->
          <div class="row-span-2 col-span-2">
            <a
              href="https://www.youtube.com/channel/UCTlsYs4MWFD6b1yGoReg1cQ"
              target="_blank"
            >
              <img
                :src="channelInfo.snippet.thumbnails.default.url"
                class="rounded-full h-10 w-10 absolute left-2 bottom-2"
              />
            </a>
          </div>

          <!-- Description -->
          <div class="flex flex-col items-center justify-center">
            <a
              :href="`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`"
              target="_blank"
            >
              <p
                class="text-purple-800 sm:text-sm font-bold items-center text-xs"
              >
                {{ video.snippet.title }}
              </p>
            </a>

            <p class="text-gray-400 text-xs mt-1">
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
