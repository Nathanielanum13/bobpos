<template>
    This is for product <b>{{ product.name }}</b>
</template>
<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  name: "Product",
  setup() {
    const route = useRoute();
    const store = useStore()

    const productId = computed(() => route.params.id);
    const product = store.getters['products/getProductById'](productId.value)

    return {
      product,
    };
  },
};
</script>

<style>
</style>