<template id="Unity">
  <div style="display: grid; place-items: center">
    <iframe
      id="webgl_iframe"
      frameborder="0"
      allow="fullscreen; vr"
      allowfullscreen=""
      allowvr=""
      mozallowfullscreen="true"
      v-bind:src="url"
      width="1000"
      height="700"
      onmousewheel=""
      webkitallowfullscreen="true"
    ></iframe>
  </div>
  <div class="container">
    <h3 style="text-align: center">{{ title }}</h3>
    <p style="text-justify: auto; text-align: center">
      {{ desc }}
    </p>
  </div>
</template>

<script>
import "../styles/global.css";

export default {
  name: "unity",
  data() {
    return {
      url: "",
      desc: "",
      title: "",
    };
  },
  methods: {
    getDesc() {
      if (
        this.url ===
        "https://64e50a20839a9019d51bb911--delicate-belekoy-4e9031.netlify.app/"
      ) {
        this.title = "Balls of Steel";
        this.desc =
          "This game holds a profound attachment for me. It began as a playful prototype while I tested some Unity mechanics, and before long, I was fully immersed in it, consistently releasing updates. The game's growth took off when I shared it with friends, and their enjoyment, along with their suggestions for improvements, motivated me. One by one, I implemented their advice, enhancing the game with updates and new features. Soon after, a couple of musician friends were so impressed that they offered to create the game's music and sounds, and you can find their names in the game's credits within the menu.";
      }
      if (
        this.url ===
        "https://64e88ff4dd8a1c0a6a4fb402--wondrous-cajeta-945cf0.netlify.app/"
      ) {
        this.title = "Clicky Crate";
        this.desc =
          "While practicing scripts in the Junior Unity Programmer Pathway, I developed this game and felt it would be a missed opportunity not to preserve and utilize it.";
      }
    },
  },
  // Vue component options
  mounted() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params);
    this.url = params.search;
    console.log(this.url);
    this.getDesc();
    //https://64e50a20839a9019d51bb911--delicate-belekoy-4e9031.netlify.app/
  },
};
</script>
