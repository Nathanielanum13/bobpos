<template>
  <router-view />
</template>
<script>
import { useStore } from "vuex";
export default {
  name: "App",
  setup() {
    const store = useStore();
    store.dispatch("loadUser");
    return {}
  },
};
</script>
<style lang="scss">
@import "@/assets/scss/styles.scss";
</style>
