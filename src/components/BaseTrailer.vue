<template>
  <div :class="['trailer', !groups.length ? 'trail-skeleton' : '']">
    <div class="trailer-left-button">
      <span class="fa fa-chevron-left" @click="goLeft"></span>
    </div>
    <div class="trailer-content" ref="trailer">
      <span class="trailer-item mx-1" v-for="item in groups" :key="item">{{ item }}</span>
    </div>
    <div class="trailer-right-button">
      <span class="fa fa-chevron-right" @click="goRight"></span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "BaseTrailer",
  props: {
    groups: {
      type: Array,
      default: [],
    },
  },
  setup() {
    const trailer = ref(null);
    const goLeft = () => {
      let trailerElement = trailer.value
      trailerElement.scroll({
        left: trailerElement.scrollLeft - 500,
        behavior: "smooth",
      });
    };

    const goRight = () => {
      let trailerElement = trailer.value
      trailerElement.scroll({
        left: trailerElement.scrollLeft + 500,
        behavior: "smooth",
      });
    };
    return {
      trailer,
      goLeft,
      goRight
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/components/base-trailer";
</style>