<template>
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
</template>

<script>
export default {
  name: "unity",
  data() {
    return {
      url: "",
    };
  },
  // Vue component options
  mounted() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params);
    this.url = params.search;
    console.log(this.url);
    //https://64e50a20839a9019d51bb911--delicate-belekoy-4e9031.netlify.app/
  },
};
</script>
