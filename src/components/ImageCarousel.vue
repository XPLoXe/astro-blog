<template>
  <Carousel>
    <Slide v-for="(image, index) in images" :key="index">
      <div class="flex flex-col">
        <img
          :src="image.src"
          :alt="image.alt"
          class="object-contain max-h-[85vh] w-auto"
        />
        <i>
          {{ image.description }}
        </i>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from "vue";
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";

import "vue3-carousel/dist/carousel.css";

export default defineComponent({
  name: "Basic",
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      images: [
        {
          src: "../public/about-pic1.jpg",
          alt: "Slide image 1",
          description: "Alejandro Bocchicchio Mesa",
        },
        {
          src: "../public/about-pic2.jpg",
          alt: "Slide image 2",
          description: "Bariloche, Argentina",
        },
        {
          src: "../public/about-pic3.jpg",
          alt: "Slide image 3",
          description: "Highlands Bowl, Aspen, Colorado",
        },
        {
          src: "../public/about-pic4.jpg",
          alt: "Slide image 4",
          description: "Mar del Plata, Argentina",
        },
        {
          src: "../public/about-pic5.jpg",
          alt: "Slide image 5",
          description: "Barcelona, Spain",
        },
      ],
    };
  },
});
</script>

<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--vc-clr-primary);
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>
