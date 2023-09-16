<template>
  <div></div>
</template>

<script setup>
//recieve an array of videos as a prop
const props = defineProps({
  videos: {
    type: Array,
    required: true,
  },
  channelInfo: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped></style>
