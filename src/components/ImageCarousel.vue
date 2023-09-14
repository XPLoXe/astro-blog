<template>
  <div>
    <ssr-carousel :slides-per-page="2" :gutter="40" :peekGutter="false">
      <slide :index="1"></slide>
      <slide :index="2"></slide>
      <slide :index="3"></slide>
    </ssr-carousel>
  </div>
</template>

<script setup>
import SsrCarousel from "vue-ssr-carousel";
import "vue-ssr-carousel/index.css";
</script>

<style lang="scss" scoped></style>
