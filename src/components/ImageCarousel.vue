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
import image1 from "../images/about-pic1.jpg";
import image2 from "../images/about-pic2.jpg";
import image3 from "../images/about-pic3.jpg";
import image4 from "../images/about-pic4.jpg";
import image5 from "../images/about-pic5.jpg";

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
      //array of imported images from "../images folder"

      images: [
        {
          src: image1.src,
          alt: "Slide image 1",
          description: "Alejandro Bocchicchio Mesa",
        },
        {
          src: image2.src,
          alt: "Slide image 2",
          description: "Bariloche, Argentina",
        },
        {
          src: image3.src,
          alt: "Slide image 3",
          description: "Highlands Bowl, Aspen, Colorado",
        },
        {
          src: image4.src,
          alt: "Slide image 4",
          description: "Mar del Plata, Argentina",
        },
        {
          src: image5.src,
          alt: "Slide image 5",
          description: "Barcelona, Spain",
        },
      ],

      // images: [
      //   {
      //     src: "../src/images/about-pic1.jpg",
      //     alt: "Slide image 1",
      //     description: "Alejandro Bocchicchio Mesa",
      //   },
      //   {
      //     src: "../src/images/about-pic2.jpg",
      //     alt: "Slide image 2",
      //     description: "Bariloche, Argentina",
      //   },
      //   {
      //     src: "../src/images/about-pic3.jpg",
      //     alt: "Slide image 3",
      //     description: "Highlands Bowl, Aspen, Colorado",
      //   },
      //   {
      //     src: "../src/images/about-pic4.jpg",
      //     alt: "Slide image 4",
      //     description: "Mar del Plata, Argentina",
      //   },
      //   {
      //     src: "../src/images/about-pic5.jpg",
      //     alt: "Slide image 5",
      //     description: "Barcelona, Spain",
      //   },
      // ],
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
