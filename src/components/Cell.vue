<template>
  <input type="checkbox" :checked="isChecked" @change="toggleCheck" />
</template>

<script>
export default {
  props: { initialChecked: Boolean, rowIndex: Number, colIndex: Number },
  data() {
    return {
      isChecked: this.initialChecked,
    };
  },
  methods: {
    updateContent() {
      this.$emit("input");
    },
    toggleCheck() {
      this.isChecked = !this.isChecked;
      this.$emit(
        "update:checked",
        this.isChecked,
        this.rowIndex,
        this.colIndex
      );
    },
  },
};
</script>

<style scoped>
input[type="text"] {
  appearance: none;
  border: none;
  outline: none;
  border-bottom: 0.2em solid #8a2be2;
  background: rgba(#8a2be2, 0.2);
  border-radius: 0.2em 0.2em 0 0;
  padding: 0.4em;
  color: #8a2be2;
}

input[type="checkbox"] {
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 0.15em solid #8a2be2;
  border-radius: 0.15em;
  transform: translateY(-0.075em);
  display: inline-block;
  place-content: center;
  &::before {
    content: "";
    display: grid;
    width: 0.75em;
    height: 0.75em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #8a2be2;
    background-color: CanvasText;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform-origin: left top;
  }
  &:checked::before {
    transform: scale(1);
  }
}
</style>
